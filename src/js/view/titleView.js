import * as config from '../config.js';
import View from './View.js';

class TitleView extends View {
  _renderTitle = document.querySelector('.render-text-title');
  _latestTag = document.querySelector('.latest-tag');
  _logTag = document.querySelector('.log-tag');

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
  addTitles(data, type) {
    if (type === 'artwork') {
      super.insertHTML(data, this._latestTag);
      super.insertHTML(data, this._renderTitle);
    }
    if (type === 'artworkInfo') {
      super.insertHTML(data, this._logTag);
    }
  }

  _generateMarkup(data) {
    return `
      <span>
      ${this.capitalizeName(data.name)}, <i>${data.title}</i>, ${data.year}
      </span>
    `;
  }
}

export default new TitleView();
