/* eslint-disable */
import axios from 'axios';
import { APIAPIURL } from './config.js';
import { APIARCHIVEURL, APIBASEURL } from './config.js';

export const getImage = async imgURL => {
  try {
    let img;
    const res = await fetch(`${APIARCHIVEURL}/${imgURL}`);

    if (res.ok === true) {
      const imgBlob = await res.blob();
      img = URL.createObjectURL(imgBlob);
    }

    /// FIX IT!
    if (res.ok === false) {
      const altRes = await fetch(`${APIARCHIVEURL}/test.png`);
      const imgBlob = await altRes.blob();
      img = URL.createObjectURL(imgBlob);
    }

    return img;
  } catch (err) {
    throw err;
  }
};

export const getImage2 = async imageID => {
  try {
    console.log(imageID);
    const res = await fetch(`${APIBASEURL}/s3Url/${imageID}.png`);

    console.log(res);
    const data = await res.json();
    const imgURL = data.url.split('?')[0];

    const imgData = await fetch(imgURL);
    const imgBlob = await imgData.blob();

    const img = URL.createObjectURL(imgBlob);

    const urls = {
      url: data.url,
      imgURL,
      img,
    };

    return urls;
  } catch (err) {
    throw err;
  }
};

export const putImg2 = async (url, image) => {
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: image,
  });
};

export const getTotalCount = async () => {
  const res = await fetch(`${APIAPIURL}/totalCount`);
  const data = await res.json();
  const totalCount = data.totalCount - 1;
  return totalCount;
};

export const getSearch = async (type, keyword) => {
  try {
    let data;
    if (type !== 'latest') {
      const res = await fetch(`${APIAPIURL}/search/${type}/${keyword}`);
      data = await res.json();
    }
    if (type === 'latest') {
      const res = await fetch(`${APIAPIURL}/search/${type}/latest`);
      data = await res.json();
    }
    if (data.status !== 'success') {
      throw new Error('No result found. Please try again.');
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const getSearchedPaginated = async (keyword, page, inf) => {
  try {
    const res = await fetch(
      `${APIAPIURL}/searchedPaginated/name/?inf=${inf}&keyword=${keyword}&page=${page}`
    );
    const data = await res.json();

    if (data.status !== 'success') {
      throw new Error('No result found. Please try again.');
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const searchInfinity = async (id, state) => {
  try {
    const res = await fetch(
      `${APIAPIURL}/infinity/${state ? 'top' : 'bottom'}/${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getArtwork = async (type, id) => {
  try {
    const res = await fetch(`${APIAPIURL}/${type ? id : 'latest'}`);
    const data = await res.json();

    if (data.status !== 'success') {
      throw new Error('No result found. Please try again.');
    }

    return data.data;
  } catch (err) {
    throw err;
  }
};

export const post = async (type, data) => {
  try {
    // ture : log
    // false : image
    const res = await axios({
      method: 'POST',
      url: `${APIAPIURL}/${type ? 'log' : 'upload'}`,
      data,
    });

    if (res.data.status === 'success') {
      console.log(`posted`);
    }
    // if (res.data.status !== 'success') {
    //   throw err;
    // }
  } catch (err) {
    throw err;
  }
};
