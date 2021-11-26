import View from './view.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.generate-form');

  _renderReceiver = document.querySelector('.render-receiver');

  _renderImage = document.querySelector('.render-artwork');
  _renderOriginalImage = document.querySelector('.render-origial-image');

  _secondImage = document.querySelector('.second-image');
  _artwork = document.querySelector('.artwork');

  artworkRender(image) {
    // a4) render sequence fired
    this._image = image;
    this._renderReceiver.width = 1000;
    this._renderReceiver.height = 1000;
    const renderData = this._renderReceiver.getContext('2d');
    renderData.drawImage(image, 0, 0, 1000, 1000);
  }

  artworkLatest(imgURL) {
    // change background style of...
    this._artwork.style.backgroundImage = `url(${imgURL})`;
    this._renderOriginalImage.style.backgroundImage = `url(${imgURL})`;
  }

  artworkInputData() {
    const inputDataArr = [...new FormData(this._trigger)];
    const inputData = Object.fromEntries(inputDataArr);
    return inputData;
  }

  artworkImgURL() {
    const image = new Image();
    const imgURL = (image.src = this._renderReceiver.toDataURL(
      'image/png',
      1.0
    ));
    return imgURL;
  }

  artworkReducer(type) {
    // Adds CSS values to renderImage to be conveted to canvas
    if (type === 'add')
      this._renderOriginalImage.classList.add('render-reduce');

    if (type === 'remove')
      this._renderOriginalImage.classList.remove('render-reduce');
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
