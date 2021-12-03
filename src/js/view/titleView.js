import * as config from '../config.js';
import View from './View.js';

class TitleView extends View {
  _renderTitle = document.querySelector('.render-text-title');
  _latestTitle = document.querySelector('.artwork-tag');

  addHandlerLatest(handler) {
    window.addEventListener('load', function () {
      console.log(`handler portion fired`);
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
    return `
      <span>
      ${this.capitalizeName(data.name)}, <i>${data.title}</i>, ${data.year}
      </span>
    `;
  }
}

export default new TitleView();
