import * as config from '../config.js';
import View from './View.js';
// import images from '../../archive/*.png';

class RenderView extends View {
  _renderReceiver = document.querySelector('.render-receiver');
  _renderImage = document.querySelector('.render-artwork');
  _renderOriginalImage = document.querySelector('.render-origial-image');
  _form = document.querySelector('.form-artwork');
  _artwork = document.querySelector('.artwork');
  _artworkInfo = document.querySelector('.artwork-info--1');

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
    const blob = await new Promise(res => this._renderReceiver.toBlob(res));
    return blob;

    // const imgURL = this._renderReceiver.toBlob(blob => {
    //   URL.createObjectURL(blob);
    // });
    // return imgURL;
  }

  locationDecider(location) {
    if (location === 'artwork') this._locationHTML = this._artwork;
    if (location === 'artworkInfo') this._locationHTML = this._artworkInfo;
  }

<<<<<<< HEAD
  async artworkRender(imgURL) {
    try {
      //API call for imgURL
      //DYNAMIC
      // let img;
      // const data = Object.entries(images).find(arr => arr[0] === `${imgURL}`);
      // if (data) {
      //   img = data[1];
      // } else {
      console.log(imgURL);
      let imgBlob;
      let img;
      const res = await fetch(`http://127.0.0.1:3000/archive/${imgURL}`);
      console.log(res);
      if (res.ok === 'success') {
        imgBlob = await res.blob();
        img = URL.createObjectURL(imgBlob);
      }

      if (res.ok === false) {
        console.log(`img not found`);
        img = require('../../archive/test.png');
      }

      console.log(img);
      // Option 1
      // const reader = new FileReader();
      // reader.readAsDataURL(imgBlob);
      // reader.onloadend = () => {
      //   const img64 = reader.result;
      // };
      // console.log(reader.result);

      // Option 2

      // const img =

      this._locationHTML.style.backgroundImage = `url(${img})`;
      // only fireds when location is set to artwork
      if (this._locationHTML === this._artwork)
        this._renderOriginalImage.style.backgroundImage = `url(${img})`;
    } catch (err) {
      console.log(err);
    }
=======
  artworkRender(img) {
    this._locationHTML.style.backgroundImage = `url(${img})`;
    // only fireds when location is set to artwork
    if (this._locationHTML === this._artwork)
      this._renderOriginalImage.style.backgroundImage = `url(${img})`;
>>>>>>> a5aba602f12f43e6bb936eed494a1f0828a479d1
  }

  artworkID(id) {
    //side effect
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
