function getYouTubeId(youtubeURL) {
  return youtubeURL
    .replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
}

function getImgFromYoutubeId(youTubeID) {
  return `https://img.youtube.com/vi/${youTubeID}/maxresdefault.jpg`;
}

function getImgFromUrl(url) {
  return getImgFromYoutubeId(getYouTubeId(url));
}

export default { getYouTubeId, getImgFromYoutubeId, getImgFromUrl };
