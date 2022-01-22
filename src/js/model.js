/* eslint-disable */
import html2canvas from 'html2canvas';
import { OGARTWORK } from './config.js';
import { text } from 'body-parser';

import { api } from './api.js';

export const state = {
  current: {
    name: '',
    statement: '',
    date: '',
    _id: '',
    order: '',
    img: '',
    imgURL: '',
  },
  view: '',
};

// export const latestArtwork = async function () {};

// takes dummy and convert it to canvas
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.current.img = img;
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

export const logArtwork = async (inputData, imgBlob) => {
  try {
    // save new log
    // get the order of the latest artwork from database
    const latestArtwork = await api('getLatest');

    let imageID = `${Date.now()}-${+latestArtwork.order + 1}`;

    const data = {
      name: inputData.name.toLowerCase(),
      statement: inputData.statement,
      order: +latestArtwork.order + 1,
      imgURL: `${imageID}.png`,
      timestamp: Date.now(),
    };

    const image = new FormData();
    image.append('imgURL', imgBlob, `${imageID}`);

    // state.current.imgCache = imgCache;
    // await submitArtwork(data);
    await api('postLog', data);
    await api('postImage', image);
  } catch (err) {
    console.error(err);
  }
};

export const loadLatest = async () => {
  try {
    const latestArtwork = await api('getLatest');
    if (latestArtwork.order < 1) return;
    if (latestArtwork.order.length > 0) {
      // Sets latest artwork
      updateProperties(state.current, latestArtwork);
    }
  } catch (err) {
    console.log(err);
  }
};
<<<<<<< HEAD

export const getOne = async () => {
  try {
    const hashID = window.location.hash.slice(1);
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/artworks/${hashID}`,
    });
    if (res.data.status === 'success') {
      return res.data.data.data;
    }
  } catch (err) {
    console.error(err.response);
  }
};

export const getAll = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/artworks/all`,
    });
    if (res.data.status === 'success') {
      return res.data.data.data;
    }
  } catch (err) {
    console.error(err.response);
  }
};

export const getSearched = async keyword => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/artworks/search/${keyword}`,
    });
    if (res.data.status === 'success') {
      return res.data.data.data;
    }
  } catch (err) {
    console.error(err.response);
  }
};

// const saveToStorage = function () {
//   localStorage.setItem('artworks', JSON.stringify(state.artworks));
// };
// const getFromStorage = function () {
//   const storage = localStorage.getItem('artworks');
//   if (storage) {
//     state.artworks = JSON.parse(storage);
//   }
// };

// const init = function () {
//   getFromStorage();
// };

=======
export const updateProperties = function (to, from) {
  Object.keys(to).forEach(function (key) {
    to[key] = from[key];
  });
};

// const saveToStorage = function () {
//   localStorage.setItem('artworks', JSON.stringify(state.artworks));
// };
// const getFromStorage = function () {
//   const storage = localStorage.getItem('artworks');
//   if (storage) {
//     state.artworks = JSON.parse(storage);
//   }
// };

// const init = function () {
//   getFromStorage();
// };

>>>>>>> a5aba602f12f43e6bb936eed494a1f0828a479d1
// init();
