import titleView from './view/titleView.js';
import * as model from './model.js';
import renderView from './view/renderView.js';
import descriptionView from './view/descriptionView.js';
import betweenView from './view/betweenView.js';
import logView from './view/logView.js';

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
    renderView.artworkGenerate(model.state.current.img);

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
  renderView.artworkRender(model.state.current.imgURL);
  // latest log data to artwork title for render
  titleView.addTitles(model.state.current);
  // load latest log data to description
  descriptionView.addDescription(model.state.current);
  logView.renderLatestLogs(model.state.artworks);
};

const controlLogRender = function () {
  // Gets imgURL of selected log
  const selectedArtwork = logView.getImageHashChange(model.state.artworks);
  const imgURL = selectedArtwork.imgURL;
  // Render selected url
  renderView.artworkRender(imgURL);
  // Update description and title
  descriptionView.addDescription(selectedArtwork);
  titleView.addTitles(selectedArtwork);
};

const controlSearch = function () {
  // Get input text
  // Search algorithym fired
  // Display search results
};

const init = function () {
  titleView.addHandlerLatest(controlLatestArtwork);
  renderView.addHandlerGenerateArtwork(controlGenerateArtwork);
  logView.addHandlerLogRender(controlLogRender);
  logView.addHandlerSearch();
};

init();
