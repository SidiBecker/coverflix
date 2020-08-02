import config from '../config';

const VIDEOS_URL = `${config.URL_BACKEND}/videos`;

function create(video) {
  return fetch(`${VIDEOS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(video),
  });
}

export default {
  create,
};
