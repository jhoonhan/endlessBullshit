import axios from 'axios';

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

let resultAccurate;
let resultProximate;

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

    // use current IMG to render to the canvas
    renderView.artworkGenerate(model.state.current.img);

    // rolls back reducer
    renderView.artworkReducer('remove');

    // Get rendered blob from the canvas
    const imgBlob = await renderView.artworkImgURL();

    // Save the imgURL data
    await model.logArtwork(inputData, imgBlob);
    // await model.uploadIMG(imgURL);

    // Refresh
    await controlLatestArtwork();

    // Prompt between page
    betweenView.showBetween();
    betweenView.update(model.state.current);

    // hide form
    descriptionView.toggleWindow();
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
const _update = async function (log, location = 'artwork') {
  try {
    // Selects location (artwork or artworkInfo)
    renderView.locationDecider(location);
    // Renders artwork
    if (!log) return;

    await renderView.artworkRender(log.imgURL);

    // Insert ID to artwork on view
    renderView.artworkID(log._id);
    // latest log data to artwork title for render
    titleView.addTitles(log, location);
    // highlight
    // logView.highlightActiveLog();
  } catch (err) {
    console.log(err);
  }
};

const controlLatestArtwork = async () => {
  try {
    await model.loadLatest();
    await _update(model.state.current);
    // _update(model.state.current, 'artworkInfo');

    // set has location
    window.location.hash = `#${model.state.current._id}`;

    // render logs
    // logView.renderLogs(model.state.artworks);
    // load latest log data to description
    descriptionView.addDescription(model.state.current);
  } catch (err) {
    console.log(err);
  }
};

const controlLogRender = async () => {
  try {
    // Gets imgURL of selected log
    const selectedArtwork = model.getOne();

    if (!resultProximate) return;
    scrollLogView.moveToActiveScroll(
      selectedArtwork.order,
      resultProximate.length
    );
    logView.highlightActiveLog();

    model.updateProperties(model.state.current, selectedArtwork);
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = function () {
  // Get input text
  _search();

  // if (!resultAccurate) return;
  scrollLogView.renderScrolls([resultProximate, model.state.current.order]);

  scrollLogView.moveToActiveScroll(
    resultAccurate.index,
    resultProximate.length
  );

  logView.renderLogs(resultProximate);
  logView.highlightActiveLog();
  window.location.hash = `#${resultAccurate.id}`;

  model.updateProperties(model.state.current, resultAccurate);
};

const _search = async (keyword, type) => {
  try {
    const [[resultAccu], resultProx] = logView.search(
      model.state.artworks,
      type,
      keyword
    );
    if (!resultAccu || !resultProx) {
      resultProximate = [];
      return;
    } else {
      // Side effect
      resultAccurate = resultAccu;
      resultProximate = resultProx;
    }
  } catch (err) {
    console.log(err);
  }
};

const controlSerachView = function () {
  const btn = document.querySelector('.log--toggle-view');
  const selectedArtwork = model.getOne();

  _search(selectedArtwork.order, 'order');

  if (!resultAccurate) return;
  model.updateProperties(model.state.current, resultAccurate);

  scrollLogView.renderScrolls([resultProximate, model.state.current.order]);
  scrollLogView.moveToActiveScroll(
    selectedArtwork.order,
    resultProximate.length
  );

  logView.renderLogs(resultProximate);

  window.location.hash = `#${resultAccurate._id}`;
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

// const testAPI = async function () {
//   const res = await fetch('http://127.0.0.1:3000/api/v1/artworks/latest');
//   const data = await res.json();
//   console.log(data);
// };

// const testAPI = async (req, res) => {
//   try {
//     const hashID = window.location.hash.slice(1);
//     const res = await axios({
//       method: 'GET',
//       url: `http://127.0.0.1:3000/api/v1/artworks/61ea2e48d366052e10a56221`,
//     });
//     if (res.data.status === 'success') console.log(res.data.data.data);
//   } catch (err) {
//     console.error(err.response);
//   }
// };

// export const testAPI = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: `http://127.0.0.1:3000/api/v1/artworks/all`,
//     });
//     if (res.data.status === 'success') {
//       console.log(res.data.data.data);
//       return res.data.data;
//     }
//   } catch (err) {
//     console.error(err.response);
//   }
// };

// testAPI();
