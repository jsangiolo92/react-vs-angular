import React from 'react';
import Search from './Search';
import VideoList from './VideoList';

const VideoPage = ({showSearch, videoList, videoClick, buttonText, toggleSearch, onChange, clickSearch, selectVideo}) => {
  return(
    <div>
      {showSearch ? 
        <Search onChange={onChange} clickSearch={clickSearch} toggleSearch={toggleSearch}/> :
        <button className="search-button btn" onClick={(e) => toggleSearch(e)}>Back to Search</button>
      }
      <VideoList videos={videoList} videoClick={videoClick} selectVideo={selectVideo} buttonText={buttonText}/>
    </div>
  )
}

export default VideoPage;