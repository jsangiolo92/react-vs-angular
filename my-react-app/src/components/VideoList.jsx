import React from 'react';

const VideoList = ({videos, videoClick, selectVideo, buttonText}) => {
  return(
    <ul className="video-list">
      {videos ? videos.map( (video, index) => {
        return(
          <li key={index}>
            <div className="video-container">
              <h5>{video.title}</h5>
              <img className="video-thumbnail" src={video.thumbnail} onClick={() => selectVideo(video)}></img>
              <p className="video-text">{video.description}</p>
              <button className="add-button" onClick={() => videoClick(video)}>{buttonText}</button>
            </div>
          </li>
        )
      }) : null}
    </ul>
  )
}

export default VideoList;