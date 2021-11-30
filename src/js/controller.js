import latestWorkView from './view/latestWorkView.js';
import * as model from './model.js';
import renderView from './view/renderView.js';
import descriptionView from './view/descriptionView.js';
import betweenView from './view/betweenView.js';

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
    // get and checks input data
    const inputData = descriptionView.artworkInputData();
    if (!inputData) return;

    // reduce dummy to fit in the center with 70%
    renderView.artworkReducer('add');
    //
    await model.loadArtwork(renderImage);

    // use current IMG to render
    renderView.artworkRender(model.state.current.img);

    // rolls back reducer
    renderView.artworkReducer('remove');

    // Get rendered imgURL
    const imgURL = renderView.artworkImgURL();

    // Save the data
    model.logArtwork(inputData, imgURL);

    // Prompt between page
    betweenView.showBetween();

    // hide form
    descriptionView.toggleWindow();

    // Refresh
    controlLatestArtwork();
  } catch (err) {
    console.error(`${err} - admin 2`);
  }
};

const controlLatestArtwork = function () {
  model.loadLatest();
  latestWorkView.artworkLatest(model.state.current.imgURL);
  // latest log data to artwork title for render
  latestWorkView.addTitles([
    model.state.current.name,
    model.state.current.title,
    model.state.current.date,
  ]);
  // load latest log data to description
  descriptionView.addDescription([
    model.state.current.name,
    model.state.current.date,
    model.state.current.statement,
  ]);
  // attach event handlers to generated htmls
  // descriptionView.attachEventHandler();
};

const init = function () {
  latestWorkView.addHandlerLatest(controlLatestArtwork);
  renderView.addHandlerGenerateArtwork(controlGenerateArtwork);
};

init();
