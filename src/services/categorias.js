import axios from 'axios';
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

function getAll() {
  return fetch(`${CATEGORIAS_URL}`)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error('Não foi possível adquirir os dados.');
    });
}

function create(obj) {
  return fetch(`${CATEGORIAS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
}

function getFromId(id) {
  return fetch(`${CATEGORIAS_URL}?id=${id}`).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data[0];
    }
    throw new Error('Não foi possível adquirir os dados.');
  });
}

function remove(id) {
  console.log(`${CATEGORIAS_URL}/${id}`);
  return axios.delete(`${CATEGORIAS_URL}/${id}`).then((suc) => {
    console.log(suc);
  }).catch((err) => {
    console.err(err);
  });
}

function update(categoria) {
  return fetch(`${CATEGORIAS_URL}/${categoria.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(categoria),
  });
}

export default {
  getAllWithVideos,
  getAll,
  create,
  getFromId,
  remove,
  update,
};
