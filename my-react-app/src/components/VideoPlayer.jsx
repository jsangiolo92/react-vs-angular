import React from 'react';

const VideoPlayer = ({video, goBack}) => {
  return(
    <div className="video-player-container">
      <div className="video-wrapper">
        <iframe src={'https://www.youtube.com/embed/' + video.videoId} allowFullScreen></iframe>
      </div>
      <div>
        <h3>{video.title}</h3>
        <div className="video-desc">{video.description}</div>
        <button className="search-button btn" onClick={goBack}>Back</button>
      </div>
    </div>
  )
}

export default VideoPlayer;