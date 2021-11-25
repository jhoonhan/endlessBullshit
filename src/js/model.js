import html2canvas from 'html2canvas';

const renderDatas = [];
const images = [];

export const state = {
  artworks: [],
  img: '',
  renderData: '',
};

// export const latestArtwork = async function () {};

// a2) load artwork and save it to state
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.img = img;
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

export const logArtwork = function () {
  const imgURL = getImageURL();
  // updates current user
  const index = state.artworks.length + 1;
  const log = {
    name: 'Joe Han',
    statement: 'This is total bullshit!',
    index: index,
    id: 123123,
    imgURL: imgURL,
  };
  // newely generated log gets added to archive
  state.artworks.push(log);
  console.log(state.artworks);
  saveToStorage();
};

export const getImageURL = function () {
  const canvas = document.querySelector('.result-canvas');
  let image = new Image();
  const imgURL = (image.src = canvas.toDataURL('image/png'));
  return imgURL;
};

// const loadLatest = async function () {
//   try {
//     console.log(state.artworks);
//     const test = state.artworks.slice(-1);
//     console.log(test[0]);
//   } catch (err) {
//     console.error(`${err} - admin 4`);
//   }
// };

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
// loadLatest();
