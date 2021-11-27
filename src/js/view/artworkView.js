import * as config from '../config.js';
import View from './View.js';

class ArtworkView extends View {
  _trigger = document.querySelector('.form-artwork');
  _renderReceiver = document.querySelector('.render-receiver');
  _renderImage = document.querySelector('.render-artwork');
  _renderOriginalImage = document.querySelector('.render-origial-image');
  _artwork = document.querySelector('.artwork');
  _latestName = document.querySelector('.render-text-title');

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

  addLatestTitle(data) {
    const locationHTML = this._latestName;
    const dataHTML = this._generateMarkup(data);
    return [dataHTML, locationHTML];
  }

  _generateMarkup(data) {
    const [name, date] = data;
    const year = '2222000011';
    return `
      <span>
        <i>This is Bullshit</i>, ${name}, ${year}
      </span>
    `;
  }
}

export default new ArtworkView();
