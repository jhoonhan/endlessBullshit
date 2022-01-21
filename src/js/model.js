/* eslint-disable */
import axios from 'axios';
import html2canvas from 'html2canvas';
import { OGARTWORK } from './config.js';
import { text } from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

export const state = {
  artworks: [
    {
      name: 'maurizio cattelan',
      title: 'Comedian',
      statement: `"Comedian, with its simple composition, ultimately offered a complex reflection of ourselves. We would like to warmly thank all those who participated in this memorable adventure, as well as to our colleagues. We sincerely apologize to all the visitors of the fair who today will not be able to participate in Comedian. Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero,distinctio animi praesentium, nesciunt enim quis velit, repellat incidunt illum iste? Quisquam numquam ad accusamus dolorum amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero,distinctio animi praesentium, nesciunt enim quis velit, repellat incidunt illum iste? Quisquam numquam ad accusamus dolorum amet".`,
      date: '1/1',
      year: '2019',
      _id: '123sadasdasdsad4',
      order: '0',
      imgURL: OGARTWORK,
    },
  ],
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
  imgCache: '',
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

// const today = function() {
//   const date = new Date();
//   const utcDate = Date.UTC(
//     date.getUTCFullYear(),
//     date.getUTCMonth(),
//     date.getUTCDate(),
//     date.getUTCHours(),
//     date.getUTCMinutes()
//   );
//   const formattedDate = new Intl.DateTimeFormat('en-US').format(utcDate);

//   return formattedDate;
// };

export const logArtwork = async (inputData, imgBlob) => {
  try {
    // save new log
    // get the order of the latest artwork from database
    const res = await fetch('http://127.0.0.1:3000/api/v1/artworks/latest');
    const latestArtwork = await res.json();
    const id = uuidv4();
    let imageID = `${Date.now()}-${+latestArtwork.data.data.order + 1}`;

    const data = {
      name: inputData.name.toLowerCase(),
      statement: inputData.statement,
      order: +latestArtwork.data.data.order + 1,
      imgURL: `${imageID}.png`,
      timestamp: Date.now(),
    };

    // const data2 = new FormData();
    // data2.set('name', inputData.name.toLowerCase());
    // data2.set('statement', inputData.statement);
    // data2.set('order', +latestArtwork.data.data.order + 1);
    // data2.append('img', imgBlob, 'daff');
    // imgURL.toBlob(blob => {
    //   data2.append('img', blob, 'daff');
    //   console.log(blob);
    // });

    // console.log(log.date.slice(0, 4));
    // newely generated log gets added to archive
    // state.artworks.push(log);

    // totlaNumber = totlaNumber + 1;
    const image = new FormData();
    image.append('imgURL', imgBlob, `${imageID}`);

    // state.current.imgCache = imgCache;
    await submitArtwork(data);
    await submitImage(image);
  } catch (err) {
    console.error(err);
  }
};

const submitArtwork = async data => {
  try {
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/artworks/log',
      data,
    });

    if (res.data.status === 'success') {
      console.log(`posted`);
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

const submitImage = async data => {
  try {
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/artworks/upload',
      data,
    });
    console.log(res);

    if (res.data.status === 'success') {
      console.log(`posted`);
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

export const updateProperties = function (to, from) {
  Object.keys(to).forEach(function (key) {
    to[key] = from[key];
  });
};

export const loadLatest = async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/artworks/latest');
    const data = await res.json();
    const latestArtwork = data.data.data;
    if (latestArtwork.order < 1) return;

    if (latestArtwork.order.length > 0) {
      // Sets latest artwork
      updateProperties(state.current, latestArtwork);
      // console.log(state.current);
    }
  } catch (err) {
    console.log(err);
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
