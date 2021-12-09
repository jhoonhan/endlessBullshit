import titleView from './view/titleView.js';
import * as model from './model.js';
import * as config from './config.js';
import renderView from './view/renderView.js';
import descriptionView from './view/descriptionView.js';
import betweenView from './view/betweenView.js';
import logView from './view/logView.js';
import detailView from './view/detailView.js';
import animationView from './view/animationView.js';
import scrollLogView from './view/scrollLogView.js';

const artworkContainer = document.querySelector('.render-artwork');

let resultAccurate, resultProximate;

// const aang = document.querySelector('.aang');
if (module.hot) {
  module.hot.accept();
}

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
  if (!log) return;
  renderView.artworkRender(log.imgURL);
  // Insert ID to artwork on view
  renderView.artworkID(log.id);
  // latest log data to artwork title for render
  titleView.addTitles(log, location);
  // highlight
  // logView.highlightActiveLog();
};

const controlLatestArtwork = function () {
  model.loadLatest();
  _update(model.state.current);
  // _update(model.state.current, 'artworkInfo');

  // set has location
  window.location.hash = `#${model.state.artworks.slice(-1)[0].id}`;

  // render logs
  // logView.renderLogs(model.state.artworks);
  // load latest log data to description
  descriptionView.addDescription(model.state.current);
};

const controlLogRender = function () {
  // Gets imgURL of selected log
  const selectedArtwork = logView.getImageHashChange(model.state.artworks);

  if (!resultProximate) return;
  scrollLogView.moveToActiveScroll(
    selectedArtwork.index,
    resultProximate.length
  );
  logView.highlightActiveLog();

  model.updateProperties(model.state.current, selectedArtwork);
};

const controlSearch = function () {
  // Get input text
  _search();

  // if (!resultAccurate) return;
  scrollLogView.renderScrolls([resultProximate, model.totlaNumber]);

  scrollLogView.moveToActiveScroll(
    resultAccurate.index,
    resultProximate.length
  );

  logView.renderLogs(resultProximate);
  logView.highlightActiveLog();
  window.location.hash = `#${resultAccurate.id}`;

  model.updateProperties(model.state.current, resultAccurate);
};

const _search = function (keyword, type) {
  const [[resultAccu], resultProx] = logView.search(
    model.state.artworks,
    type,
    keyword
  );
  // Side effect
  resultAccurate = resultAccu;
  resultProximate = resultProx;
};

const controlSerachView = function () {
  const btn = document.querySelector('.log--toggle-view');
  const selectedArtwork = logView.getImageHashChange(model.state.artworks);

  _search(selectedArtwork.index, 'order');

  model.updateProperties(model.state.current, resultAccurate);

  scrollLogView.renderScrolls([resultProximate, model.totlaNumber]);

  scrollLogView.moveToActiveScroll(
    selectedArtwork.index,
    resultProximate.length
  );

  logView.renderLogs(resultProximate);

  window.location.hash = `#${resultAccurate.id}`;
  logView.highlightActiveLog();

  animationView.animateToggleSearchView();
};

const init = function () {
  titleView.addHandlerLatest(controlLatestArtwork);
  renderView.addHandlerGenerateArtwork(controlGenerateArtwork);
  logView.addHandlerLogRender(controlLogRender);
  logView.addHandlerSearch(controlSearch);
  logView.addHandlerToggleView(controlSerachView);
};

init();
