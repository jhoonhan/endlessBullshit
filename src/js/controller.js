import titleView from './view/titleView.js';
import * as model from './model.js';
import * as api from './api.js';
import * as config from './config.js';
import renderView from './view/renderView.js';
import descriptionView from './view/descriptionView.js';
import betweenView from './view/betweenView.js';
import logView from './view/logView.js';
import detailView from './view/detailView.js';
import animationView from './view/animationView.js';
import scrollLogView from './view/scrollLogView.js';
import mobileView from './view/mobileView.js';
import { isMobile } from './helper.js';

if (module.hot) {
  module.hot.accept();
}

const _update = async function (log, location = 'artwork') {
  try {
    // Selects location (artwork or artworkInfo)
    renderView.locationDecider(location);
    // Renders artwork
    if (!log) return;

    // renderView.artworkRender(await api.api('getImage', log.imgURL));
    renderView.artworkRender(await api.getImage(log.imgURL));

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

const testfn = (type, location) => {
  animationView.renderSpinner(`${type}`);
  // console.log(`${type} from ${location}`);
};
const controlGenerateArtwork = async function (renderImage) {
  // @renderImage = html node to be converted to image
  try {
    // animationView.renderSpinner('add');
    testfn('add', 'GenerateArtwork');

    // get and checks input data
    const inputData = descriptionView.artworkInputData();
    if (!inputData) return;

    // reduce dummy to fit in the center with 70%
    renderView.artworkReducer('add');

    //ERR
    await model.loadArtwork(renderImage);

    // use current IMG to render to the canvas
    renderView.artworkGenerate(model.state.current.img);

    // rolls back reducer
    renderView.artworkReducer('remove');

    // Get rendered blob from the canvas
    const [imgBlob, img64] = await renderView.artworkImgURL();

    // Save the imgURL data
    await model.logArtwork(inputData, imgBlob);
    // await model.uploadIMG(imgURL);

    // Refresh
    await controlLatestArtwork();

    // Prompt between page
    betweenView.showBetween();
    // Update between page
    betweenView.update([model.state.current, img64]);

    // animationView.renderSpinner('remove');
    testfn('remove', 'GenerateArtwork');
  } catch (err) {
    console.error(`${err} - admin 2`);
  }
};

const controlLatestArtwork = async () => {
  try {
    // animationView.renderSpinner('add');
    testfn('add', 'controlLatestArtwork');

    await model.loadLatest();
    await _update(model.state.current);
    // _update(model.state.current, 'artworkInfo');

    // set has location
    window.location.hash = `#${model.state.current._id}`;

    // load latest log data to description
    descriptionView.addDescription(model.state.current);

    // Refresh state
    model.state.resultAccurate = '';
    model.state.resultProximate = '';
    model.state.searchedIMG = '';

    // animationView.renderSpinner('remove');
    testfn('remove', 'controlLatestArtwork');
  } catch (err) {
    console.log(err);
  }
};

const controlLogRender = async () => {
  try {
    // animationView.renderSpinner('add');
    testfn('add', 'controlLogRender');

    if (!model.state.resultProximate) {
      testfn('remove', 'controlLogRender');
      // console.log(`1234`);
      return;
    }

    // Gets imgURL of selected log
    const hashID = window.location.hash.slice(1);
    const selectedArtwork = await api.getOne(hashID);
    // Guard Clause

    // Web
    if (!isMobile()) {
      scrollLogView.moveToActiveScroll(
        selectedArtwork.order,
        model.state.resultProximate.length
      );
      logView.highlightActiveLog();
      logView.scrollIntoView('.highlighted-text');

      scrollLogView.renderActiveScroll(
        await api.getImage(selectedArtwork.imgURL)
      );
    }

    //Mobile
    if (isMobile()) {
      mobileView.renderDetail([
        selectedArtwork,
        await api.getImage(selectedArtwork.imgURL),
        model.state.current.order,
      ]);

      logView.highlightActiveLogMobile();
      logView.scrollIntoView('.highlighted-text--mobile');
    }

    // animationView.renderSpinner('remove');
    testfn('remove', 'controlLogRender');
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async () => {
  try {
    // animationView.renderSpinner('add');
    testfn('add', 'controlSearch');

    // Web
    if (!isMobile()) {
      await _search(undefined, logView.getSearchType());

      // if (!model.state.resultAccurate) return;
      scrollLogView.renderScrolls([
        model.state.resultProximate,
        model.state.current.order,
      ]);
      scrollLogView.moveToActiveScroll(
        model.state.resultAccurate.order,
        model.state.resultProximate.length
      );
      scrollLogView.renderActiveScroll(
        await api.getImage(model.state.resultAccurate.imgURL)
      );

      logView.renderLogs(model.state.resultProximate, 'landscape');
      logView.highlightActiveLog();
      window.location.hash = `#${model.state.resultAccurate._id}`;

      model.updateProperties(model.state.current, model.state.resultAccurate);
    }

    // Mobile
    if (isMobile()) {
      console.log(`mobile going`);
      const options = document.querySelector('.log__searchby--mobile');
      const input = document.querySelector('.log__search__input--mobile');
      const searchType = options.value;
      const searchKeyword = input.value;

      await _search(searchKeyword, searchType);
      logView.renderLogs(model.state.resultProximate, 'portrait');

      window.location.hash = `#${model.state.resultAccurate._id}`;
    }

    // animationView.renderSpinner('remove');
    testfn('remove', 'controlSearch');
  } catch (err) {
    console.log(err);
  }
};

const _search = async (keyword, type) => {
  try {
    // animationView.renderSpinner('add');

    let searchKeyword = keyword;
    if (!keyword && type !== 'latest') {
      searchKeyword = logView.getSearchInput();
    }
    if (type === 'latest') {
      const { resultAccu, resultProx } = await api.getSearch(
        searchKeyword,
        type
      );
      model.state.resultAccurate = resultAccu;
      model.state.resultProximate = resultProx;
      return;
    }
    const { resultAccu, resultProx } = await api.getSearch(searchKeyword, type);

    if (!resultAccu || !resultProx) {
      model.state.resultProximate = [];
      return;
    } else {
      // Side effect
      model.state.resultAccurate = resultAccu;
      model.state.resultProximate = resultProx;
    }

    // animationView.renderSpinner('remove');
  } catch (err) {
    console.log(err);
  }
};

const controlSerachView = async () => {
  try {
    // animationView.renderSpinner('add');
    testfn('add', 'controlSerachView');

    // DRY
    const row1 = document.querySelector('.section--2 .row--1');
    const rect = row1.getBoundingClientRect();

    if (rect.x >= 300) {
      animationView.animateToggleSearchView();
      animationView.renderSpinner('remove');
      return;
    }

    if (rect.x < 300 && !model.state.resultAccurate) {
      await model.loadLatest();
      await _update(model.state.current);
      await _search(model.state.current._id, 'id');
    }

    if (!model.state.searchedIMG) {
      model.state.searchedIMG = await api.getImage(
        model.state.resultAccurate.imgURL
      );
      console.log(model.state.searchedIMG);
    }

    if (!model.state.resultAccurate) return;
    model.updateProperties(model.state.current, model.state.resultAccurate);

    // Web
    if (!isMobile()) {
      scrollLogView.renderScrolls([
        model.state.resultProximate,
        model.state.current.order,
      ]);
      scrollLogView.moveToActiveScroll(
        model.state.resultAccurate.order,
        model.state.resultProximate.length
      );
      scrollLogView.renderActiveScroll(model.state.searchedIMG);

      logView.renderLogs(model.state.resultProximate, 'landscape');
      // window.location.hash = `#${model.state.resultAccurate._id}`;
      logView.highlightActiveLog();
      logView.scrollIntoView('.highlighted-text');
      animationView.animateToggleSearchView();
    }

    // Mobile
    if (isMobile()) {
      // Mobile render option
      logView.renderLogs(model.state.resultProximate, 'portrait');
      // console.log(model.state.resultAccurate);
      mobileView.renderDetail([
        model.state.resultAccurate,
        model.state.searchedIMG,
        model.state.current.order,
      ]);

      logView.highlightActiveLogMobile();
      logView.scrollIntoView('.highlighted-text--mobile');

      animationView.animateMobileArchive();
    }
    // animationView.renderSpinner('remove');
    testfn('remove', 'controlSerachView');
  } catch (err) {}
};

const init = function () {
  titleView.addHandlerLatest(controlLatestArtwork);
  renderView.addHandlerGenerateArtwork(controlGenerateArtwork);
  logView.addHandlerLogRender(controlLogRender);
  logView.addHandlerSearch(controlSearch);
  logView.addHandlerToggleView(controlSerachView);
  mobileView.addHandlerToggleView(controlSerachView);
};

init();

// const wait = (delay = 0) =>
//   new Promise(resolve => setTimeout(resolve, delay));

// const setVisible = (elementOrSelector, visible) =>
//   (typeof elementOrSelector === 'string'
//     ? document.querySelector(elementOrSelector)
//     : elementOrSelector
//   ).style.display = visible ? 'block' : 'none';

// setVisible('.page', false);
// setVisible('#loading', true);

// document.addEventListener('DOMContentLoaded', () =>
//   wait(1000).then(() => {
//     setVisible('.page', true);
//     setVisible('#loading', false);
//   }));

// const nugum = document.querySelector('.loading');
// document.addEventListener('DOMContentLoaded', () => {
//   nugum.classList.remove('visibilityVisible');
//   console.log(`fucking loading done man`);
// });
