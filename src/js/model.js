import html2canvas from 'html2canvas';
import { ARTWORK } from './config.js';

const { v4: uuidv4 } = require('uuid');

export const state = {
  artworks: [],
  img: '',
  curImgURL: '',
};

// export const latestArtwork = async function () {};

// takes dummy and convert it to canvas
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.img = img;
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

export const logArtwork = function (inputData, imgURL) {
  // save new log
  const index = state.artworks.length + 1;
  const log = {
    name: inputData.name,
    statement: inputData.statement,
    index: index,
    id: uuidv4(),
    imgURL: imgURL,
  };
  // newely generated log gets added to archive
  state.artworks.push(log);
  console.log(state.artworks);
  saveToStorage();
};

export const loadLatest = function () {
  if (state.artworks.length < 1) {
    console.log(ARTWORK);
    state.curImgURL = ARTWORK;
    return;
  }
  // Selects the latest artwork
  const [log] = state.artworks.slice(-1);
  // Sets its to current image.
  state.curImgURL = log.imgURL;
};

const saveToStorage = function () {
  localStorage.setItem('artworks', JSON.stringify(state.artworks));
};
const getFromStorage = function () {
  const storage = localStorage.getItem('artworks');
  if (storage) {
    state.artworks = JSON.parse(storage);
  }
};

const init = function () {
  getFromStorage();
};

init();
