function sort(dados) {
  return dados.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
}

function toast(addToast, mensagem, tipo, autoDismiss) {
  addToast(mensagem, {
    appearance: tipo,
    autoDismiss: autoDismiss || true,
  });
}

function getYouTubeId(youtubeURL) {
  return youtubeURL
    .replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
}

function getRelativeWidth(height) {
  var widthRatio = 16;
  var heightRatio = 9;
  return ((widthRatio * height) / heightRatio);
}

function getRelativeHeight(width) {
  var widthRatio = 16;
  var heightRatio = 9;
  return ((width * heightRatio) / widthRatio);
}

export default {
  sort,
  toast,
  getYouTubeId,
  getRelativeHeight,
  getRelativeWidth
};
