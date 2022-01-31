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

let resultAccurate;
let resultProximate;

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

const controlGenerateArtwork = async function (renderImage) {
  // @renderImage = html node to be converted to image
  try {
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

    // hide form
    descriptionView.toggleWindow();
  } catch (err) {
    console.error(`${err} - admin 2`);
  }
};

const controlLatestArtwork = async () => {
  try {
    await model.loadLatest();
    await _update(model.state.current);
    // _update(model.state.current, 'artworkInfo');

    // set has location
    window.location.hash = `#${model.state.current._id}`;

    // load latest log data to description
    descriptionView.addDescription(model.state.current);
  } catch (err) {
    console.log(err);
  }
};

const controlLogRender = async () => {
  try {
    // Gets imgURL of selected log
    const hashID = window.location.hash.slice(1);
    const selectedArtwork = await api.getOne(hashID);
    // Guard Clause
    if (!resultProximate) return;

    // Web
    if (!isMobile()) {
      scrollLogView.moveToActiveScroll(
        selectedArtwork.order,
        resultProximate.length
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
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async () => {
  try {
    // Web
    if (!isMobile()) {
      await _search(undefined, logView.getSearchType());

      // if (!resultAccurate) return;
      scrollLogView.renderScrolls([resultProximate, model.state.current.order]);
      scrollLogView.moveToActiveScroll(
        resultAccurate.order,
        resultProximate.length
      );
      scrollLogView.renderActiveScroll(
        await api.getImage(resultAccurate.imgURL)
      );

      logView.renderLogs(resultProximate, 'landscape');
      logView.highlightActiveLog();
      window.location.hash = `#${resultAccurate._id}`;

      model.updateProperties(model.state.current, resultAccurate);
    }

    // Mobile
    if (isMobile()) {
      console.log(`mobile going`);
      const options = document.querySelector('.log__searchby--mobile');
      const input = document.querySelector('.log__search__input--mobile');
      const searchType = options.value;
      const searchKeyword = input.value;

      await _search(searchKeyword, searchType);
      logView.renderLogs(resultProximate, 'portrait');

      window.location.hash = `#${resultAccurate._id}`;
    }
  } catch (err) {
    console.log(err);
  }
};

const _search = async (keyword, type) => {
  try {
    let searchKeyword = keyword;
    if (!keyword && type !== 'latest') {
      searchKeyword = logView.getSearchInput();
    }
    if (type === 'latest') {
      const { resultAccu, resultProx } = await api.getSearch(
        searchKeyword,
        type
      );
      resultAccurate = resultAccu;
      resultProximate = resultProx;
      return;
    }
    const { resultAccu, resultProx } = await api.getSearch(searchKeyword, type);

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

const controlSerachView = async () => {
  try {
    await model.loadLatest();
    await _update(model.state.current);
    await _search(model.state.current._id, 'id');

    if (!resultAccurate) return;
    model.updateProperties(model.state.current, resultAccurate);

    // Web
    if (!isMobile()) {
      scrollLogView.renderScrolls([resultProximate, model.state.current.order]);
      scrollLogView.moveToActiveScroll(
        resultAccurate.order,
        resultProximate.length
      );
      scrollLogView.renderActiveScroll(
        await api.getImage(resultAccurate.imgURL)
      );

      logView.renderLogs(resultProximate, 'landscape');
      // window.location.hash = `#${resultAccurate._id}`;
      logView.highlightActiveLog();
      logView.scrollIntoView('.highlighted-text');

      animationView.animateToggleSearchView();
    }

    // Mobile
    if (isMobile()) {
      // Mobile render option
      logView.renderLogs(resultProximate, 'portrait');
      // console.log(resultAccurate);
      mobileView.renderDetail([
        resultAccurate,
        await api.getImage(resultAccurate.imgURL),
        model.state.current.order,
      ]);

      logView.highlightActiveLogMobile();
      logView.scrollIntoView('.highlighted-text--mobile');

      animationView.animateMobileArchive();
    }
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

// const testAPI = async () => {
//   try {
//     const res = await fetch(
//       `http://127.0.0.1:3000/api/v1/artworks/search/id/61eb2886c50d3f7bd0419289`
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
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
