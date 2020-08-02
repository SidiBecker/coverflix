import config from '../config';

const CATEGORIAS_URL = `${config.URL_BACKEND}/categorias`;

function getAllWithVideos() {
  return fetch(`${CATEGORIAS_URL}?_embed=videos`)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error('Não foi possível adquirir os dados.');
    });
}

function getAllVideos() {
  return fetch(`${CATEGORIAS_URL}`)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error('Não foi possível adquirir os dados.');
    });
}

export default {
  getAllWithVideos,
  getAllVideos,
};
