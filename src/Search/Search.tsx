import * as React from 'react'
const styles = require('./search.css');

interface ISearchProps {
  onClick: (event: any) => void,
  onChange: (event: any) => void,
  onChangeHash: (event: any) => void,
  keyword: string,
  hashtag: string,
  setSearchMode: any,
  searchMode: string
}
interface ISearchState {
  showOptions: boolean
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      showOptions: false
    }
  }
  private showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }
  private switchPlaceholder = () => {
    let placeholder: string;
    this.props.searchMode === 'keyword' || this.props.searchMode === ''
      ? placeholder = 'keyword...'
      : placeholder = 'name, name...'
    return placeholder;
  }
  public render(){
    return (
      <div>
        <form className={styles.form}>
          <div className={styles.selectWrapper}>
            <div className={styles.select} onClick={this.showOptions}>
              <p>{this.props.searchMode ? this.props.searchMode : 'keyword'}</p>
            </div>
            <div className={styles.selectOptions} data-show={this.state.showOptions}>
              <ul>
                <li data-value="keyword" onClick={this.props.setSearchMode}>keyword</li>
                <li data-value="user" onClick={this.props.setSearchMode}>user</li>
              </ul>
            </div>
          </div>

          <input
            type="hidden"
            name="searchMode"
            value={this.props.searchMode}/>
          <input
            type="search"
            placeholder={this.switchPlaceholder()}
            value={this.props.keyword}
            onChange={this.props.onChange}
            className={styles.inputText}/>
          <button onClick={this.props.onClick} className={styles.submit}></button>
        </form>
      </div>
    )
  }
}