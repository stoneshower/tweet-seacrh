import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Tweets from './Tweets/Tweets';
import Search from './Search/Search';
const styles = require('./app.css');

interface IndexState {
  searchMode: string,
  greet: string,
  keyword: string,
  hashtag: string,
  tweets: {[key: string]: any},
  tweetsUser: {[key: string]: any}
}

class App extends React.Component<{}, IndexState> {
  state = {
    searchMode: 'keyword',
    greet: 'Hola',
    keyword: '',
    hashtag: '',
    tweets: [
      {
        full_text: '',
        user: {
          description: '',
          favourites_count: '',
          followers_count: '',
          friends_count: '',
          id: '',
          location: '',
          name: '',
          created_at: '',
          screen_name: '',
          profile_image_url: ''
        }
      }
    ],
    tweetsUser: [
      {
        full_text: '',
        user: {
          description: '',
          favourites_count: '',
          followers_count: '',
          friends_count: '',
          id: '',
          location: '',
          name: '',
          created_at: '',
          screen_name: '',
          profile_image_url: ''
        }
      }
    ]
  }

  handleChange = (e: any) => {
    this.setState({
      ...this.state,
      keyword: e.target.value
    })
  }

  handleChaneHash = (e: any) => {
    this.setState({
      ...this.state,
      hashtag: e.target.value
    })
  }

  handleCallApi = (e: any) => {
    e.preventDefault();
    if (!this.state.keyword) return;
    var option: any = {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    let request = async () => {
      switch(this.state.searchMode){
        case 'keyword':
          var response:any = await fetch(`/tweet_place?q=${this.state.keyword} %23${this.state.hashtag}`, option)
          var json: any = await response.json();
          this.setState({tweets:json.statuses})
          console.log(json.statuses)
          break;
        case 'user':
          var response:any = await fetch(`/tweet_user?q=${this.state.keyword}`, option)
          var json: any = await response.json();
          console.log(json.error[0].code);
          (json.error[0].code === 17) ? null : this.setState({tweetsUser:json});
          break;
      }

    }
    request();
  }

  updateSearchMode = (e: any) => {
    this.setState({
      searchMode: e.target.dataset.value
    })
  }

  render(){
    return(
      <div>
        <Search
          onClick={this.handleCallApi}
          onChange={this.handleChange}
          onChangeHash={this.handleChaneHash}
          keyword={this.state.keyword}
          hashtag={this.state.hashtag}
          setSearchMode={this.updateSearchMode}
          searchMode={this.state.searchMode}/>
          <Tweets
          keyword={this.state.keyword}
          tweets={this.state.tweets}
          tweetsUser={this.state.tweetsUser}
          searchMode={this.state.searchMode}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)