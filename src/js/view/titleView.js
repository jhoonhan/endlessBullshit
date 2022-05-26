import View from './view.js';

class TitleView extends View {
  _renderTitle = document.querySelector('.render__text--title');
  _latestTag = document.querySelector('.latest-tag');
  _logTag = document.querySelector('.scroll--1 .log-tag');
  _introTag = document.querySelector('.intro__tag');

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
    console.log(data);
    if (type === 'artwork') {
      super.insertHTML(data, this._latestTag);
      super.insertHTML(data, this._renderTitle);
      super.insertHTML(data, this._introTag);
    }
    if (type === 'artworkInfo') {
      super.insertHTML(data, this._logTag);
    }
  }

  _generateMarkup(data) {
    const year = data.date.slice(0, 4);
    return `
      <span>
      ${this.capitalizeName(data.name)}, <i>This Is Bullshit</i>, ${year}
      </span>
    `;
  }
}

export default new TitleView();
