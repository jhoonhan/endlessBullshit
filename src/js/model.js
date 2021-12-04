import html2canvas from 'html2canvas';
import { ARTWORK } from './config.js';

const { v4: uuidv4 } = require('uuid');

export const state = {
  artworks: [
    {
      name: 'maurizio cattelan',
      title: 'Comedian',
      statement: `"Comedian, with its simple composition, ultimately offered a complex reflection of ourselves. We would like to warmly thank all those who participated in this memorable adventure, as well as to our colleagues. We sincerely apologize to all the visitors of the fair who today will not be able to participate in Comedian. Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero,distinctio animi praesentium, nesciunt enim quis velit, repellat incidunt illum iste? Quisquam numquam ad accusamus dolorum amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero,distinctio animi praesentium, nesciunt enim quis velit, repellat incidunt illum iste? Quisquam numquam ad accusamus dolorum amet".`,
      date: '1/1',
      year: '2019',
      id: '123sadasdasdsad4',
      index: '0',
      img: '',
      imgURL: ARTWORK,
    },
  ],
  current: {
    name: '',
    title: '',
    statement: '',
    date: '',
    year: '',
    id: '',
    index: '',
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

const today = function () {
  const date = new Date();
  const utcDate = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  );
  const formattedDate = new Intl.DateTimeFormat('en-US').format(utcDate);

  return formattedDate;
};

export const logArtwork = function (inputData, imgURL) {
  // save new log

  const index = state.artworks.length;
  const log = {
    name: inputData.name.toLowerCase(),
    title: 'This is Bullshit',
    statement: inputData.statement,
    date: today().slice(0, -5),
    year: today().slice(-4),
    id: uuidv4(),
    index: index,
    imgURL: imgURL,
  };
  // console.log(log.date.slice(0, 4));
  // newely generated log gets added to archive
  state.artworks.push(log);
  console.log(state.artworks);
  saveToStorage();
};

export const loadLatest = function () {
  if (state.artworks.length < 1) return;

  if (state.artworks.length > 0) {
    // Sets latest artwork
    const [latestLog] = state.artworks.slice(-1);
    state.current.name = latestLog.name;
    state.current.title = latestLog.title;
    state.current.statement = latestLog.statement;
    state.current.date = latestLog.date;
    state.current.year = latestLog.year;
    state.current.id = latestLog.id;
    state.current.index = latestLog.index;
    state.current.imgURL = latestLog.imgURL;
  }
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
