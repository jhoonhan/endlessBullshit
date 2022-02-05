/* eslint-disable */
import axios from 'axios';
import { APIBASEURL } from './config.js';

export const getImage = async imgURL => {
  try {
    let img;
    const res = await fetch(`http://127.0.0.1:3000/archive/${imgURL}`);

    if (res.ok === true) {
      const imgBlob = await res.blob();
      img = URL.createObjectURL(imgBlob);
    }

    /// FIX IT!
    if (res.ok === false) {
      const altRes = await fetch(`http://127.0.0.1:3000/archive/test.png`);
      const imgBlob = await altRes.blob();
      img = URL.createObjectURL(imgBlob);

      // newError(
      //   'Unable to load the image. You may close this window and continue to use the website.'
      // );
    }

    return img;
  } catch (err) {
    throw err;
  }
};

export const getTotalCount = async () => {
  const res = await fetch(`${APIBASEURL}/totalCount`);
  const data = await res.json();
  const totalCount = data.totalCount - 1;
  return totalCount;
};

export const getSearch = async (type, keyword) => {
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
      `${APIBASEURL}/searchedPaginated/name/?inf=${inf}&keyword=${keyword}&page=${page}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(`err`);
  }
};

export const searchInfinity = async (id, state) => {
  try {
    const res = await fetch(
      `${APIBASEURL}/infinity/${state ? 'top' : 'bottom'}/${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getArtwork = async (type, id) => {
  try {
    const res = await fetch(`${APIBASEURL}/${type ? id : 'latest'}`);
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
      url: `${APIBASEURL}/${type ? 'log' : 'upload'}`,
      data,
    });

    if (res.data.status === 'success') {
      console.log(`posted`);
    }
    if (res.data.status !== 'success') {
      // console.log(`you fucked up`);
    }
  } catch (err) {
    throw err;
  }
};

// export const postImage = async img => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: `${APIBASEURL}/upload`,
//       data: img,
//     });

//     if (res.data.status === 'success') {
//       console.log(`posted`);
//     }
//     if (res.data.status !== 'success') {
//     }
//   } catch (err) {
//     throw err;
//   }
// };
// export const postLog = async data => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: `${APIBASEURL}/log`,
//       data,
//     });
//     if (res.data.status === 'success') {
//       console.log(`posted`);
//     }
//   } catch (err) {
//     throw err;
//   }
// };

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
