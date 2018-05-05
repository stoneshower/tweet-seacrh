import * as React from 'react';
const styles = require('./tweets.css');

export interface ITweetsProps{
  keyword: string,
  tweets: any,
  tweetsUser: any,
  searchMode: string
}

export default class Tweets extends React.Component<ITweetsProps, {}> {
  constructor(props: ITweetsProps) {
      super(props);
  }


  public render(){
    let searchMode: string = this.props.searchMode
    let outputTweet;
    console.log(this.props.tweets)
    if (this.props.searchMode === '') {
      outputTweet = ''
    } else if ( (this.props.searchMode === 'keyword') || (this.props.searchMode === 'hashtag') ) {
      outputTweet = (
        <div className={styles.panelWrapper}>
          {
            this.props.tweets
              .sort((a: any, b: any) => b.user.followers_count - a.user.followers_count)
              .map((tweet: {[key: string]: any}, index: number) => {
              return (
                  <article key={index+'_panel'} className={styles.panel}>
                    <ul key={index+'_panelInner'} className={styles.panelInner}>
                      <li key={index+'_text'}>{tweet.full_text}</li>
                      <li key={index+'_profileWrap'} className={styles.profile}>
                        <ul className={styles.profile_main}>
                          <li key={index+'_profile_image_url'}><img src={tweet.user.profile_image_url} width="40" height="40"/></li>
                          <li key={index+'_screen_name'}>@{tweet.user.screen_name}</li>
                        </ul>
                        <ul className={styles.profile_descr}>
                          <li key={index+'_description'}>{tweet.user.description}</li>
                        </ul>
                        <ul className={styles.profile_count}>
                          <li key={index+'_followers_count'}>followers: {tweet.user.followers_count}</li>
                          <li key={index+'_friends_count'}>following: {tweet.user.friends_count}</li>
                        </ul>
                        <ul className={styles.profile_sub}>
                          <li key={index+'_id'}>{tweet.user.id}</li>
                          <li key={index+'_location'}>{tweet.user.location}</li>
                        </ul>
                      </li>
                    </ul>
                  </article>
                )
              }
            )
          }
        </div>
      )
    } else if (this.props.searchMode === 'user') {
      outputTweet = (
        <div className={styles.panelWrapper}>
          {
            this.props.tweetsUser
              .map((tweet: {[key: string]: any}, index: number) => {
              return (
                  <article key={index+'_panel'} className={`${styles.panel} ${styles.panelOfUser}`}>
                    <ul key={index+'_panelInner'} className={styles.panelInner}>
                      <li key={index+'_profileWrap'} className={styles.profile}>
                        <ul className={styles.profile_main}>
                          <li key={index+'_profile_image_url'}><img src={tweet.user.profile_image_url} width="40" height="40"/></li>
                          <li key={index+'_created_at'}>@{tweet.user.created_at}</li>
                          <li key={index+'_name'}>@{tweet.user.name}</li>
                          <li key={index+'_screen_name'}>@{tweet.user.screen_name}</li>
                        </ul>
                        <ul className={styles.profile_descr}>
                          <li key={index+'_description'}>{tweet.full_text}</li>
                        </ul>
                        <ul className={styles.profile_sub}>
                          <li key={index+'_id'}>{tweet.user.id}</li>
                          <li key={index+'_location'}>{tweet.user.location}</li>
                        </ul>
                      </li>
                    </ul>
                  </article>
                )
              }
            )
          }
        </div>
      )
    }

    return(
      outputTweet
    )
  }
}