import View from './view.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.btn--submit');
  _canvas = document.querySelector('.artwork-canvas');
  _renderImage = document.querySelector('.render-artwork');
  _secondImage = document.querySelector('.second-image');
  _artwork = document.querySelector('.artwork');
  _artworkDummy = document.querySelector('.artwork-dummy');

  addHandlerRender(handler) {
    this._trigger.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        handler(this._renderImage, this._secondImage);
      }.bind(this)
    );
  }

  addHandlerLatest(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
}

export default new ArtworkView();
