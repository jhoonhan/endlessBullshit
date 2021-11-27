import * as config from '../config.js';
import View from './View.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.form-artwork');
  _renderReceiver = document.querySelector('.render-receiver');
  _renderImage = document.querySelector('.render-artwork');
  _renderOriginalImage = document.querySelector('.render-origial-image');
  _artwork = document.querySelector('.artwork');
  _renderTitle = document.querySelector('.render-text-title');
  _latestTitle = document.querySelector('.artwork-tag');

  locationHTML;

  artworkRender(image) {
    // a4) render sequence fired
    this._image = image;
    this._renderReceiver.width = config.RENDERQUALITY;
    this._renderReceiver.height = config.RENDERQUALITY;
    const renderData = this._renderReceiver.getContext('2d');
    renderData.drawImage(
      image,
      0,
      0,
      config.RENDERQUALITY,
      config.RENDERQUALITY
    );
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
    if (type === 'add') {
      this._renderOriginalImage.classList.add('render-reduce');
      this._renderOriginalImage.style.opacity = config.OPACITY;
    }

    if (type === 'remove') {
      this._renderOriginalImage.classList.remove('render-reduce');
      this._renderOriginalImage.style.opacity = 1;
    }
  }

  addHandlerGenerateArtwork(handler) {
    this._trigger.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        handler(this._renderImage);
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
