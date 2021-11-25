import html2canvas from 'html2canvas';

const renderDatas = [];

export const state = {
  artworks: [],
  img: '',
  renderData: '',
};

// export const latestArtwork = async function () {};

// a2) load artwork and save it to state
export const loadArtwork = async function (renderImage, canvas) {
  try {
    const img = await html2canvas(renderImage);
    logArtwork(img, canvas);
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

const getRenderData = async function (canvas) {
  const renderedData = canvas.getContext('2d');
  return renderedData;
};

const logArtwork = async function (img, canvas) {
  const renderedData = await getRenderData(canvas);
  if (!renderedData) throw new Error(err);

  // updates current user
  state.img = img;
  state.renderData = renderedData;
  renderDatas.push(renderedData);
  console.log(renderDatas);

  const index = state.artworks.length + 1;
  const log = {
    name: 'Joe Han',
    statement: 'This is total bullshit!',
    index: index,
    id: 123123,
    img: img,
    renderData: renderedData,
  };

  // newely generated log gets added to archive
  state.artworks.push(log);
  console.log(state.artworks);

  saveToStorage();

  // saveToStorage();
};

const loadLatest = async function () {
  try {
    console.log(state.artworks);
    const test = state.artworks.slice(-1);
    console.log(test[0]);
  } catch (err) {
    console.error(`${err} - admin 4`);
  }
};

const saveToStorage = function () {
  localStorage.setItem('artworks', JSON.stringify(state.artworks));

  localStorage.setItem('data', JSON.stringify(renderDatas));
};

const getFromStorage = function () {
  const storage = localStorage.getItem('artworks');
  if (storage) {
    state.artworks = JSON.parse(storage);
  }

  JSON.parse(localStorage.getItem('data'));
};

const init = function () {
  getFromStorage();
};

init();
loadLatest();
