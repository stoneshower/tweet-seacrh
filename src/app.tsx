import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Tweets from './Tweets/Tweets';
import Search from './Search/Search';
const styles = require('./app.css');

// interface Props {
//   searchMode: string,
//   greet: string,
//   keyword: string,
//   hashtag: string,
//   tweets: {[key: string]: any},
//   tweetsUser: {[key: string]: any},
//   showOptions: boolean,
// }

interface IndexState {
  searchMode: string,
  greet: string,
  keyword: string,
  hashtag: string,
  tweets: {[key: string]: any},
  tweetsUser: {[key: string]: any},
  showOptions: boolean,
}

class App extends React.Component<{}, IndexState> {
  state = {
    searchMode: 'keyword',
    greet: 'Hola',
    keyword: '',
    user: '',
    hashtag: '',
    showOptions: false,
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

  handleChange = (e: any) :void => {
    this.setState({
      ...this.state,
      keyword: e.target.value
    })
  }

  handleChaneHash = (e: any) :void=> {
    this.setState({
      ...this.state,
      hashtag: e.target.value
    })
  }

  handleCallApi = (e: any) :void=> {
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
          var response:any = await fetch(`/tweet_keyword?q=${this.state.keyword} %23${this.state.hashtag}`, option)
          var json: any = await response.json();
          this.setState({tweets:json.statuses})
          console.log(json.statuses)
          break;
        case 'user':
          var response:any = await fetch(`/tweet_user?q=${this.state.keyword}`, option)
          var json: any = await response.json();
          // (json.error[0].code === 17) ? null : this.setState({tweetsUser:json});
          this.setState({tweetsUser:json});
          break;
      }
      console.log(json)
    }
    request();
  }

  updateSearchMode = (e: any) :void=> {
    this.setState({
      searchMode: e.target.dataset.value
    })
  }

  switchShowOptions = () :string=> {
    this.setState({
      showOptions: !this.state.showOptions
    })
    return this.state.showOptions ? 'true' : 'false'
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
          searchMode={this.state.searchMode}
          showOptions={this.state.showOptions}
          onSwitchOptions={this.switchShowOptions}/>
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