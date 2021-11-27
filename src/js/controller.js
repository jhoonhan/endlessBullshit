import latestWorkView from './view/latestWorkView.js';
import * as model from './model.js';
import artworkView from './view/artworkView.js';
import latestWorkView from './view/latestWorkView.js';

const artworkContainer = document.querySelector('.render-artwork');

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

const controlGenerateArtwork = async function (renderImage) {
  // @renderImage = html node to be converted to image
  try {
    // reduce dummy to fit in the center with 70%
    artworkView.artworkReducer('add');
    //
    await model.loadArtwork(renderImage);

    // use current IMG to render
    artworkView.artworkRender(model.state.current.img);

    // rolls back reducer
    artworkView.artworkReducer('remove');

    // Get input data rendered imgURL
    const inputData = artworkView.artworkInputData();
    const imgURL = artworkView.artworkImgURL();

    // Save the data
    model.logArtwork(inputData, imgURL);
  } catch (err) {
    console.error(`${err} - admin 2`);
  }
};

const controlLatestArtwork = function () {
  model.loadLatest();
  latestWorkView.artworkLatest(model.state.current.imgURL);
  // previous log data to artwork title for render
  latestWorkView.addTitles([
    model.state.current.name,
    model.state.current.title,
    model.state.current.date,
  ]);
};

const init = function () {
  latestWorkView.addHandlerLatest(controlLatestArtwork);
  artworkView.addHandlerGenerateArtwork(controlGenerateArtwork);
  console.log(model.state.artworks);
};

init();
