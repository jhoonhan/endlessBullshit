/* eslint-disable */
import html2canvas from 'html2canvas';
import * as config from './config.js';

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
    imgID: '',
  },
  resultAccurate: '',
  resultProximate: '',
  searchedIMG: '',
  page: '',
  totalCount: '',
};

const validateInput = (text, hard) => {
  let validatedText;
  if (!hard) validatedText = text.replace(/[^0-9a-zA-Z. ]/g, '');
  if (hard) validatedText = text.replace(/[^a-zA-Z0-9]/g, '');

  return validatedText;
};

// takes dummy and convert it to canvas
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.current.img = img;
  } catch (err) {
    // throw new Error(
    //   `${err}//Unable to render the request. Please try again later (${err})`
    // );
    console.error(err);
    throw err;
  }
};

export const logArtwork = async (inputData, imgBlob) => {
  try {
    // Clean out speical characters
    const cleanedName = validateInput(inputData.name, false);

    // save new log
    // get the order of the latest artwork from database
    const index = await api.getTotalCount();

    let imageID = `${Date.now()}-${+index + 1}`;

    const data = {
      name: cleanedName.toLowerCase(),
      statement: inputData.statement,
      order: +index + 1,
      imgURL: `${imageID}.png`,
      imgID: imageID,
      timestamp: Date.now(),
    };

    const image = new FormData();
    image.append('imgURL', imgBlob, `${imageID}`);

    // state.current.imgCache = imgCache;
    // await submitArtwork(data);

    // get secure url from our server
    const { url } = await api.getImage2(data.imgID);

    // post the image directly to the s3 bucket
    await api.post(false, image);
    await api.putImg2(url, imgBlob);

    // post data to server
    await api.post(true, data);
  } catch (err) {
    throw err;
  }
};

// export const testS3 = async () => {
//   try {
//     const { url } = await api.getImage2();
//     console.log(url);

//     await api.putImg2(url);
//   } catch (err) {
//     throw err;
//   }

// const { url } = fetch('/s3Url').then(res => res.json());
// console.log(url);
// };

export const loadLatest = async () => {
  try {
    const latestArtwork = await api.getArtwork(false, 'latest');
    if (!latestArtwork) return;
    updateProperties(state.current, latestArtwork);
  } catch (err) {
    throw err;
  }
};

export const search = async (data, paginateData) => {
  try {
    const [keyword, type] = data;

    const valKeyword = validateInput(keyword, false);

    if (type === 'latest') {
      const { resultAccu, resultProx } = await api.getSearch(type, valKeyword);
      state.resultAccurate = resultAccu;
      state.resultProximate = resultProx;
      return;
    }

    if (type === 'order' || type === 'id') {
      const data = await api.getSearch(type, valKeyword);
      const { resultAccu, resultProx } = data;
      state.resultAccurate = resultAccu;
      state.resultProximate = resultProx;
    }
    if (type === 'name') {
      const [page, inf] = paginateData;
      const data = await api.getSearchedPaginated(valKeyword, page, inf);
      const { resultAccu, resultProx } = data;
      state.resultAccurate = resultAccu;
      state.resultProximate = resultProx.reverse();
      state.page = +data.page.curPage;
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
