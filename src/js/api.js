/* eslint-disable */
import axios from 'axios';
import { APIBASEURL } from './config.js';

export const getImage = async imgURL => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/archive/${imgURL}`);
    const imgBlob = await res.blob();
    const img = URL.createObjectURL(imgBlob);
    return img;
  } catch (err) {
    throw err;
  }
};

export const getSearch = async (keyword, type) => {
  try {
    let data;
    if (type !== 'latest') {
      const res = await fetch(`${APIBASEURL}/search/${type}/${keyword}`);
      data = await res.json();
    }
    if (type === 'latest') {
      const res = await fetch(`${APIBASEURL}/search/${type}/latest`);
      data = await res.json();
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const getOne = async id => {
  try {
    const res = await fetch(`${APIBASEURL}/${id}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};
export const getLatest = async () => {
  try {
    const res = await fetch(`${APIBASEURL}/latest`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};
export const postImage = async img => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${APIBASEURL}/upload`,
      data: img,
    });
    if (res.data.status === 'success') {
      console.log(`posted`);
    }
  } catch (err) {
    throw err;
  }
};
export const postLog = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${APIBASEURL}/log`,
      data,
    });
    if (res.data.status === 'success') {
      console.log(`posted`);
    }
  } catch (err) {
    throw err;
  }
};

// export const api = async (fnType, param, param2) => {
//   try {
//     // Fetch Image and return
//     if (fnType === 'getImage') {
//       const res = await fetch(`http://127.0.0.1:3000/archive/${param}`);
//       const imgBlob = await res.blob();
//       const img = URL.createObjectURL(imgBlob);
//       return img;
//     }
//     // Search by type and blah
//     if (fnType === 'getSearch') {
//       const res = await fetch(`${APIBASEURL}/search/${param2}/${param}`);
//       const data = await res.json();
//       return data;
//     }
//     // Search and get one
//     if (fnType === 'getOne') {
//       const res = await fetch(`${APIBASEURL}/${param}`);
//       const data = await res.json();
//       return data.data;
//     }
//     // Get the latest artwork
//     if (fnType === 'getLatest') {
//       const res = await fetch(`${APIBASEURL}/latest`);
//       const data = await res.json();
//       return data.data;
//     }

//     if (fnType === 'postImage') {
//       const res = await axios({
//         method: 'POST',
//         url: `${APIBASEURL}/upload`,
//         data: param,
//       });
//       if (res.data.status === 'success') {
//         console.log(`posted`);
//       }
//     }
//     if (fnType === 'postLog') {
//       const res = await axios({
//         method: 'POST',
//         url: `${APIBASEURL}/log`,
//         data: param,
//       });
//       if (res.data.status === 'success') {
//         console.log(`posted`);
//       }
//     }
//   } catch (err) {
//     console.error(err.response.data);
//   }
// };
