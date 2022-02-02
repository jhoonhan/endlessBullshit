/* eslint-disable */
import html2canvas from 'html2canvas';
import { OGARTWORK } from './config.js';
import { text } from 'body-parser';

import * as api from './api.js';

export const state = {
  current: {
    name: '',
    statement: '',
    date: '',
    _id: '',
    order: '',
    imgURL: '',
  },
  resultAccurate: '',
  resultProximate: '',
  searchedIMG: '',
};

// export const latestArtwork = async function () {};

// takes dummy and convert it to canvas
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.current.img = img;
  } catch (err) {
    throw new Error(
      `Unable to render the request. Please try again later (${err})`
    );
  }
};

export const logArtwork = async (inputData, imgBlob) => {
  try {
    // save new log
    // get the order of the latest artwork from database
    const latestArtwork = await api.getArtwork(false, 'latest');

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
    await api.post(true, data);
    console.log(`divide`);
    await api.post(false, image);
  } catch (err) {
    throw err;
  }
};

export const loadLatest = async () => {
  try {
    const latestArtwork = await api.getArtwork(false, 'latest');
    if (!latestArtwork) return;
    updateProperties(state.current, latestArtwork);
  } catch (err) {
    throw err;
  }
};

export const search = async values => {
  try {
    const [keyword, type] = values;

    if (type === 'latest') {
      const { resultAccu, resultProx } = await api.getSearch(type, keyword);
      state.resultAccurate = resultAccu;
      state.resultProximate = resultProx;
      return;
    }

    const { resultAccu, resultProx } = await api.getSearch(type, keyword);
    if (!resultAccu || !resultProx) {
      state.resultProximate = [];
      return;
    } else {
      // Side effect
      state.resultAccurate = resultAccu;
      state.resultProximate = resultProx;
    }
  } catch (err) {
    throw err;
  }
};

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

// init();
