import View from './view.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.btn--submit');

  _canvas = document.querySelector('.artwork-canvas');
  _renderImage = document.querySelector('.render-artwork');
  _secondImage = document.querySelector('.second-image');

  addHandlerRender(handler) {
    this._trigger.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        handler(this._renderImage, this._secondImage);
      }.bind(this)
    );
  }
}

export default new ArtworkView();
