const TWITTER_CONSUMER_KEY = '0N31LOG1OPT2kDUVOpbmHNqJi';
const TWITTER_CONSUMER_SECRET = 'zRu51w9TINQ8VtMmmDH5uevElTfjxHw8HJEThAMKVqjZi8y3zi';
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3030/auth/twitter/callback"
},
function(token, tokenSecret, profile, done) {
  passport.session.id = profile.id;

  profile.twitter_token = token;
  profile.twitter_token_secret = tokenSecret;

  process.nextTick(function () {
      return done(null, profile);
  });
}
));

module.exports = {passport: passport};