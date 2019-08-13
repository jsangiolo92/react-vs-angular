import React from 'react';
import './App.css';

import VideoPlayer from './components/VideoPlayer';
import VideoPage from './components/VideoPage';
import searchYouTube from './youtube-search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      watchList: [],
      userInput: '',
      currentVideo: null,
      showSearch: true
    }

    this.onChange = this.onChange.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  search(str) {
    searchYouTube(str).then(results => {
      this.setState({searchResults: results});
    });
  }

  onChange(event) {
    this.setState({userInput: event.target.value});
  }

  clickSearch() {
    this.search(this.state.userInput);
  }

  addToWatchList(video) {
    const newWatchList = this.state.watchList;
    newWatchList.push(video);
    this.setState({watchList: newWatchList});
  }

  removeFromWatchList(videoToRemove) {
    const newWatchList = this.state.watchList;
    const indexToRemove = newWatchList.findIndex((video) => video.videoId === videoToRemove.videoId);
    newWatchList.splice(indexToRemove, 1);
    this.setState({watchList: newWatchList});
  }

  selectVideo(video) {
    this.setState({currentVideo: video});
  }

  toggleSearch(e) {
    e.preventDefault();
    this.setState({showSearch: !this.state.showSearch});
  }

  goBack() {
    this.setState({currentVideo: null});
  }

  render() {
    return (
      <div className="App">React App
        {this.state.currentVideo ? 
          <VideoPlayer video={this.state.currentVideo} goBack={this.goBack}/> : 
          <VideoPage
            showSearch={this.state.showSearch}
            videoList={this.state.showSearch ? this.state.searchResults : this.state.watchList}
            videoClick={this.state.showSearch ? this.addToWatchList : this.removeFromWatchList}
            buttonText={this.state.showSearch ? 'Add to Watch List' : 'Remove from Watch List'}
            toggleSearch={this.toggleSearch}
            onChange={this.onChange}
            clickSearch={this.clickSearch}
            selectVideo={this.selectVideo}
          />
        }
      </div>
    );
  }
}

export default App;
