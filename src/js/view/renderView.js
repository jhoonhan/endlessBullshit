import * as config from '../config.js';
import View from './View.js';

class RenderView extends View {
  _renderReceiver = document.querySelector('.render-receiver');
  _renderImage = document.querySelector('.render-artwork');
  _renderOriginalImage = document.querySelector('.render-origial-image');
  _form = document.querySelector('.form-artwork');
  _artwork = document.querySelector('.artwork');
  _artworkInfo = document.querySelector('.artwork-info');

  _renderTitle = document.querySelector('.render-text-title');
  _latestTitle = document.querySelector('.artwork-tag');

  _locationHTML = '';

  addHandlerGenerateArtwork(handler) {
    this._form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        handler(this._renderImage);
      }.bind(this)
    );
  }
  artworkGenerate(image) {
    // a4) render sequence fired
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
  artworkImgURL() {
    const image = new Image();
    const imgURL = (image.src = this._renderReceiver.toDataURL(
      'image/png',
      1.0
    ));
    return imgURL;
  }

  locationDecider(location) {
    if (location === 'artwork') this._locationHTML = this._artwork;
    if (location === 'artworkInfo') this._locationHTML = this._artworkInfo;
  }

  artworkRender(imgURL) {
    this._locationHTML.style.backgroundImage = `url(${imgURL})`;
    // only fireds when location is set to artwork
    if (this._locationHTML === this._artwork)
      this._renderOriginalImage.style.backgroundImage = `url(${imgURL})`;
  }

  artworkID(id) {
    this._locationHTML.dataset.id = id;
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
}

export default new RenderView();
