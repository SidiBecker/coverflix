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
  console.log(`${VIDEOS_URL}/${id}`);
  return axios.delete(`${VIDEOS_URL}/${id}`).then((suc) => {
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

function getFromId(id) {
  return fetch(`${VIDEOS_URL}?id=${id}&_expand=categoria`).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data[0];
    }
    throw new Error('Não foi possível adquirir os dados.');
  });
}

function update(video) {
  return fetch(`${VIDEOS_URL}/${video.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(video),
  });
}

export default {
  getAll,
  create,
  remove,
  getAllWithCategoria,
  getFromId,
  update,
};
