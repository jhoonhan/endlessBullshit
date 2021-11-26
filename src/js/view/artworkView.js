import View from './view.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.generate-form');
  _canvas = document.querySelector('.artwork-canvas');
  _renderImage = document.querySelector('.render-artwork');
  _secondImage = document.querySelector('.second-image');
  _artwork = document.querySelector('.artwork');
  _artworkDummy = document.querySelector('.artwork-dummy');
  _resultCanvas = document.querySelector('.result-canvas');

  artworkRender(image, run, canvas = this._canvas) {
    // a4) render sequence fired
    this._image = image;
    canvas.width = 1000;
    canvas.height = 1000;
    if (run === 'first') canvas.style.opacity = 0.6;
    const renderData = canvas.getContext('2d');
    renderData.drawImage(image, 0, 0, 1000, 1000);
  }

  artworkLatest(imgURL) {
    // change background style of...
    this._artwork.style.backgroundImage = `url(${imgURL})`;
    this._artworkDummy.style.backgroundImage = `url(${imgURL})`;
  }

  artworkInputData() {
    const inputDataArr = [...new FormData(this._trigger)];
    const inputData = Object.fromEntries(inputDataArr);
    return inputData;
  }

  artworkImgURL() {
    const image = new Image();
    const imgURL = (image.src = this._resultCanvas.toDataURL('image/png', 1.0));
    return imgURL;
  }

  addHandlerGenerateArtwork(handler) {
    this._trigger.addEventListener(
      'submit',
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
