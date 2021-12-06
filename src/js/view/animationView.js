import * as config from '../config.js';
import View from './View.js';

class AnimationView extends View {
  _column1 = document.querySelector('.column--1');
  _column2 = document.querySelector('.column--2');
  _column3 = document.querySelector('.column--3');
  _column4 = document.querySelector('.column--4');
  _column5 = document.querySelector('.column--5');
  _row1 = document.querySelector('.row--1');
  _row2 = document.querySelector('.row--2');
  _row3 = document.querySelector('.row--3');

  _expandSearchBtn = document.querySelector('.log--toggle-view');

  toggleDescription() {
    this._row1.classList.toggle('left100vw');
  }
  toggleDetailInformation() {
    this._row2.classList.toggle('top100vh');
  }

  toggleRotateExpandBtn() {
    this._expandSearchBtn.classList.toggle('arrow-rotate');
  }

  _generateMarkup(data) {}
}

export default new AnimationView();
