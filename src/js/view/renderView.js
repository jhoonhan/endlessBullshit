import * as config from '../config.js';
import View from './view.js';
// import images from '../../archive/*.png';

class RenderView extends View {
  _renderReceiver = document.querySelector('.render__receiver');
  _renderImage = document.querySelector('.render__artwork');
  _renderOriginalImage = document.querySelector('.render__origial-image');
  _form = document.querySelector('.artwork__form');
  _artwork = document.querySelector('.artwork');
  _artworkInfo = document.querySelector('.artwork-info--1');

  _renderTitle = document.querySelector('.render__text--title');
  _latestTitle = document.querySelector('.artwork__tag');

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
    // get node elements from specified HTML element(this._renderImage in <canvas> form from model.state.imageCache)
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
  async artworkImgURL() {
    const imgBlob = await new Promise(res => this._renderReceiver.toBlob(res));

    const img64 = this._renderReceiver.toDataURL();
    // console.log(img64);

    return [imgBlob, img64];

    // const imgURL = this._renderReceiver.toBlob(blob => {
    //   URL.createObjectURL(blob);
    // });
    // return imgURL;
  }

  locationDecider(location) {
    if (location === 'artwork') this._locationHTML = this._artwork;
    if (location === 'artworkInfo') this._locationHTML = this._artworkInfo;
  }

  artworkRender(imgURL) {
    // console.log(imgURL);
    this._locationHTML.style.backgroundImage = `url(${imgURL})`;
    document.querySelector(
      '.intro__artwork'
    ).style.backgroundImage = `url(${imgURL})`;
    // only fireds when location is set to artwork
    if (this._locationHTML === this._artwork)
      this._renderOriginalImage.style.backgroundImage = `url(${imgURL})`;
  }

  artworkID(id) {
    //side effect
    this._locationHTML.dataset.id = id;
  }

  artworkReducer(type) {
    // Adds CSS values to renderImage to be conveted to canvas
    if (type === 'add') {
      this._renderOriginalImage.classList.add('render--reduce');
      this._renderOriginalImage.style.opacity = config.OPACITY;
    }
    if (type === 'remove') {
      this._renderOriginalImage.classList.remove('render--reduce');
      this._renderOriginalImage.style.opacity = 1;
    }
  }
}

export default new RenderView();
