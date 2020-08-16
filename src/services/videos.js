import axios from 'axios';
import config from '../config';

const VIDEOS_URL = `${config.URL_BACKEND}/videos`;

function getAll() {
  return fetch(`${VIDEOS_URL}`).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Não foi possível adquirir os dados.');
  });
}

function create(video) {
  return fetch(`${VIDEOS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(video),
  });
}

function remove(id) {
  axios.delete(`${config.URL_BACKEND}/videos/${id}`).then((suc) => {
    console.log(suc);
  }).catch((err) => {
    console.err(err);
  });
}

function getAllWithCategoria() {
  return fetch(`${VIDEOS_URL}?_expand=categoria`).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Não foi possível adquirir os dados.');
  });
}

export default {
  getAll,
  create,
  remove,
  getAllWithCategoria,
};
