import html2canvas from 'html2canvas';
import { ARTWORK } from './config.js';

const { v4: uuidv4 } = require('uuid');

export const state = {
  artworks: [],
  current: {
    name: '',
    id: '',
    statement: '',
    index: '',
    img: '',
    imgURL: '',
    date: '',
  },
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

export const logArtwork = function (inputData, imgURL) {
  // save new log
  const index = state.artworks.length + 1;
  const log = {
    name: inputData.name,
    id: uuidv4(),
    index: index,
    statement: inputData.statement,
    imgURL: imgURL,
    date: '22222',
  };
  // newely generated log gets added to archive
  state.artworks.push(log);
  console.log(state.artworks);
  saveToStorage();
};

export const loadLatest = function () {
  if (state.artworks.length < 1) {
    console.log(ARTWORK);
    state.current.imgURL = ARTWORK;
    return;
  }
  if (state.artworks.length < 1) return;
  // Sets latest artwork
  const [latestLog] = state.artworks.slice(-1);
  state.current.name = latestLog.name;
  state.current.id = latestLog.id;
  state.current.index = latestLog.index;
  state.current.statement = latestLog.statement;
  state.current.imgURL = latestLog.imgURL;
  state.current.date = latestLog.date;
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
