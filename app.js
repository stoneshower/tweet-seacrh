const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync('./server.key', 'utf8')
const certificate = fs.readFileSync('./server.crt', 'utf8')
// const TwitterCredentials = require('./credentials.js')
// import {TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_CALLBACK} from './credentials.js'
const credentials = {key: privateKey, cert: certificate}

const express = require('express')
const util = require('util');
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const connect = require('connect')
const expressSession = require('express-session')

const Twitter = require('twitter')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const cors = require('cors')
const multer = require('multer')
const multipart = multer()
const app = express()
const router = require('./routes/router')


// const TWITTER_CONSUMER_KEY = TwitterCredentials.TWITTER_CONSUMER_KEY;
// const TWITTER_CONSUMER_SECRET = TwitterCredentials.TWITTER_CONSUMER_SECRET;
// const TWITTER_CALLBACK = TwitterCredentials.TWITTER_CALLBACK;
const TWITTER_CONSUMER_KEY = '0N31LOG1OPT2kDUVOpbmHNqJi';
const TWITTER_CONSUMER_SECRET = 'zRu51w9TINQ8VtMmmDH5uevElTfjxHw8HJEThAMKVqjZi8y3zi';
const TWITTER_CALLBACK = 'https://localhost:4435/auth/twitter/callback';

passport.serializeUser(
  (user, callback) => {
    console.log(user)
    callback(null, user);
  }
);

passport.deserializeUser(
  (obj, callback) => {
    console.log(obj)
    callback(null, obj);
  }
);

passport.use(
  new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: TWITTER_CALLBACK,
    includeEmail: true
  },
  (accessToken, refreshToken, profile, callback) => {
    passport.session.id = profile.id
    profile.twitter_token = accessToken
    profile.twitter_token_secret = refreshToken

    process.nextTick(() =>{
      console.log(profile)
      return callback(null, profile)
    })
  })
);

app.set('views', `${__dirname}/public`)
app.set('view engine', 'ejs')


app.use(express.static(__dirname));
app.use(express.static('public'));

app.use(expressSession({
  secret: 'reply-analyzer',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.get('/oauth', passport.authenticate('twitter'));
app.get('/login', router.login)

// callback後の設定
app.get(
  '/auth/twitter/callback',
  passport.authenticate(
    'twitter',
    {failureRedirect: '/oauth' }
  ),
  (req, res) => {
    res.render('index', {title : 'タイトル'});
  }
);

app.get('/', function(req, res) {
    // res.redirect('/oauth');
    res.render('index', {title: 'tweets'});
});


const client = new Twitter({
  consumer_key: '0N31LOG1OPT2kDUVOpbmHNqJi',
  consumer_secret: 'zRu51w9TINQ8VtMmmDH5uevElTfjxHw8HJEThAMKVqjZi8y3zi',
  access_token_key: '177224133-jzRVgr6zWELmAUqYwvzCNzPuePXPK3NMVCfx6Dxm',
  access_token_secret: '3tCCUGpZNynwUOyArvdxPIUYhDIYON71dtjlYkGUSL9uX'
})


// client.get('geo/id/df51dec6f4ee2b2c',
// app.get('/tweets', (req, res, next) => {
//   client.get('statuses/show'),
//    {count: 1},
// 988384362788937700

app.get('/tweets', (req, res, next) => {
  client.get('statuses/user_timeline',
   { screen_name: 'NasteL_cs', count: 20 },
   (error, tweets, response) => {
    if (!error) {
      // res.status(200).render('index', { title: 'Express', tweets: tweets });
      return res.send(tweets);
    }
    else {
      res.status(500).json({ error: error });
    }
  });
})


app.get('/tweet_place', (req, res, next) => {
  console.log(req);
  client.get('search/tweets.json',
    {
      q: req.query.q,
      count: 100,
      tweet_mode: 'extended'
    },
    // lang: 'ja',
   (error, tweets, response) => {
    if (!error) {
      return res.send(tweets);
    }
    else {
      res.status(500).json({ error: error });
    }
  });
})


app.get('/tweet_user', (req, res, next) => {
  client.get('users/lookup.json',
    {
      screen_name: req.query.q,
      include_entities: true,
      tweet_mode: 'extended'
    },
   (error, response) => {
     console.log(response)
    if (!error) {
      return res.send(response);
    }
    else {
      res.status(500).json({ error: error });
    }
  });
})


const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(process.env.PORT || 3000)
httpsServer.listen(process.env.PORT || 4435)
console.log(`listen on port 4435`)