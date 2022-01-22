/* eslint-disable */
import axios from 'axios';

export const api = async (fnType, param, param2) => {
  try {
    const baseURL = 'http://127.0.0.1:3000/api/v1/artworks';
    // Fetch Image and return
    if (fnType === 'getImage') {
      const res = await fetch(`http://127.0.0.1:3000/archive/${param}`);
      const imgBlob = await res.blob();
      const img = URL.createObjectURL(imgBlob);
      return img;
    }
    // Search by type and blah
    if (fnType === 'getSearch') {
      const res = await fetch(`${baseURL}/search/${param2}/${param}`);
      const data = await res.json();
      return data;
    }
    // Search and get one
    if (fnType === 'getOne') {
      const res = await fetch(`${baseURL}/${param}`);
      const data = await res.json();
      return data.data;
    }
    // Get the latest artwork
    if (fnType === 'getLatest') {
      const res = await fetch(`${baseURL}/latest`);
      const data = await res.json();
      return data.data;
    }

    if (fnType === 'postImage') {
      const res = await axios({
        method: 'POST',
        url: `${baseURL}/upload`,
        data: param,
      });
      if (res.data.status === 'success') {
        console.log(`posted`);
      }
    }
    if (fnType === 'postLog') {
      const res = await axios({
        method: 'POST',
        url: `${baseURL}/log`,
        data: param,
      });
      if (res.data.status === 'success') {
        console.log(`posted`);
      }
    }
  } catch (err) {
    console.error(err.response.data);
  }
};
