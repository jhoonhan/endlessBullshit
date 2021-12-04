import titleView from './view/titleView.js';
import * as model from './model.js';
import * as config from './config.js';
import renderView from './view/renderView.js';
import descriptionView from './view/descriptionView.js';
import betweenView from './view/betweenView.js';
import logView from './view/logView.js';
import detailView from './view/detailView.js';
import animationView from './view/animationView.js';

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

    // Save the img url data
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
// const _updateArtwork = function (log) {
//   if (!log) return;
//   renderView.artworkRender(log.imgURL);
//   // Insert ID to artwork on view
//   renderView.artworkID(log.id);
//   // latest log data to artwork title for render
//   titleView.addTitles(log);
//   // load latest log data to description
//   descriptionView.addDescription(log);
//   // render logs
//   logView.renderLogs(model.state.artworks);
//   // highlight
//   logView.highlightActiveLog();
// };
const _update = function (log, location = 'artwork') {
  // Selects location (artwork or artworkInfo)
  renderView.locationDecider(location);
  // Renders artwork
  renderView.artworkRender(log.imgURL);
  // Insert ID to artwork on view
  renderView.artworkID(log.id);
  // latest log data to artwork title for render
  titleView.addTitles(log, location);
  // highlight
  logView.highlightActiveLog();
};

const controlLatestArtwork = function () {
  model.loadLatest();
  _update(model.state.current);
  _update(model.state.current, 'artworkInfo');

  // set has location
  window.location.hash = `#${model.state.current.id}`;

  // render logs
  logView.renderLogs(model.state.artworks);
  // load latest log data to description
  descriptionView.addDescription(model.state.current);
};

const controlLogRender = function () {
  // Gets imgURL of selected log
  const selectedArtwork = logView.getImageHashChange(model.state.artworks);
  // Update
  _update(selectedArtwork, 'artworkInfo');

  detailView.addDetailInformation(selectedArtwork);
  controlSearch(model.state.artworks, 'order', selectedArtwork.index);
};

const controlSearch = function (data = model.state.artworks, type, keyword) {
  // Get input text
  const [[resultAccu], resultProx] = logView.search(data, type, keyword);
  // render the first result
  _update(resultAccu, 'artworkInfo');
  // Display search results
  logView.renderLogs(resultProx);
  // add detail info
  detailView.addDetailInformation(resultAccu);
  // change has to the first result item
  window.location.hash = `#${resultAccu.id}`;
  // rerun highlight
  logView.highlightActiveLog();
};

const controlSerachView = function () {
  logView.toggleView();

  const btn = document.querySelector('.log--toggle-view');
  const selectedArtwork = logView.getImageHashChange(model.state.artworks);

  // refine logs according to the latest artwork
  controlSearch(model.state.artworks, 'order', selectedArtwork.index);

  if (btn.dataset.type === 'close') {
    animationView.toggleDescription();
    animationView.toggleDetailInformation();
    animationView.toggleRotateExpandBtn();
    detailView.addDetailInformation(selectedArtwork);
  } else {
    animationView.toggleDescription();
    animationView.toggleDetailInformation();
    animationView.toggleRotateExpandBtn();
    // returns to the latest when search closed.
    window.location.hash = `#${model.state.current.id}`;
  }
};

const init = function () {
  titleView.addHandlerLatest(controlLatestArtwork);
  renderView.addHandlerGenerateArtwork(controlGenerateArtwork);
  logView.addHandlerLogRender(controlLogRender);
  logView.addHandlerSearch(controlSearch);
  logView.addHandlerToggleView(controlSerachView);
};

init();
