import * as config from '../config.js';
import View from './View.js';

class LatestWorkView extends View {
  _renderTitle = document.querySelector('.render-text-title');
  _latestTitle = document.querySelector('.artwork-tag');
  _renderOriginalImage = document.querySelector('.render-origial-image');

  addHandlerLatest(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  // artworkLatest(imgURL) {
  //   // change background style of...
  //   this._artwork.style.backgroundImage = `url(${imgURL})`;
  //   this._renderOriginalImage.style.backgroundImage = `url(${imgURL})`;
  // }
  addTitles(data) {
    super.insertHTML(data, this._renderTitle);
    super.insertHTML(data, this._latestTitle);
  }

  _generateMarkup(data) {
    const [name, title, date] = data;
    const year = '2222000011';
    return `
      <span>
      ${name}, <i>${title}</i>, ${date}
      </span>
    `;
  }
}

export default new LatestWorkView();
