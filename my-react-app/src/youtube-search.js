const searchYouTube = (queryString) => {
  const options = {
    key: 'AIzaSyCCTy52C708A18C07VBwk4Rcohq72VOkvs',
    q: queryString,
    maxResults: 20,
    videoEmbeddable: true,
    part: 'snippet',
    type: 'video'
  };

  const url = appendURL(options);
  return fetch(url)
    .then(responseObject => responseObject.json())
    .then(searchResults => searchResults.items)
    .then(items => items.map( (item) => {
        return {
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.default.url
        };
      })
    )
    .catch(err => console.error('error in fetch to YouTube API: ', err));
}

const appendURL = (optionsObj) => {
  let url = 'https://www.googleapis.com/youtube/v3/search?';

  for (const key in optionsObj) {
    url += `${key}=${optionsObj[key]}&`;
  }

  return url;
}

module.exports = searchYouTube;
