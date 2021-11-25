import View from './view.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.btn--submit');

  _canvas = document.querySelector('.artwork-canvas');
  renderImage = document.querySelector('.render-artwork');

  addHandlerRender(handler) {
    this._trigger.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        handler(this.renderImage);
      }.bind(this)
    );
  }
}

export default new ArtworkView();
