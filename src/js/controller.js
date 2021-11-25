import * as model from './model.js';
import artworkView from './view/artworkView.js';
import html2canvas from 'html2canvas';

const artworkContainer = document.querySelector('.render-artwork');

const { default: html2canvas } = require('html2canvas');

// const aang = document.querySelector('.aang');
if (module.hot) {
  module.hot.accept();
}

// const screenshot = async function () {
//   try {
//     const canvas = document.querySelector('.artwork-canvas');
//     const renderedData = canvas.getContext('2d');
//     console.log(renderedData);
//     const res = await html2canvas(artworkContainer);
//     const hmm = function () {
//       canvas.width = 1000;
//       canvas.height = 1000;
//       canvas.style.opacity = 0.5;
//       // canvas.classList.add('opacity');
//       console.log(canvas);
//       renderedData.drawImage(res, 0, 0, 1001, 1001);
//     };
//     hmm();
//   } catch (err) {
//     console.log(err);
//   }
// };

const controlRenderArtwork = async function (renderImage, secondImage) {
  // @renderImage = html node to be converted to image
  try {
    // a1) Load artwork and have Model to save userImg
    // a1) current IMG becomes state.userImg

    await model.loadArtwork(renderImage);
    // a3) use current IMG to render
    artworkView.artworkRender(model.state.img, 'first');

    // second loop starts
    const resultCanvas = document.querySelector('.result-canvas');
    await model.loadArtwork(secondImage);
    artworkView.artworkRender(model.state.img, 'second', resultCanvas);

    // fire image converter
    model.logArtwork();
  } catch (err) {
    console.error(`${err} - admin 2`);
  }
};

const renderLatestArtwork = async function () {
  try {
  } catch (err) {
    console.error(`${err} - admin 3`);
  }
};

const init = function () {
  artworkView.addHandlerRender(controlRenderArtwork);
};
init();

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(arr.length);
