import * as config from '../config.js';
import View from './View.js';

class AnimationView extends View {
  _column1 = document.querySelector('.column--1');
  _column2 = document.querySelector('.column--2');
  _column3 = document.querySelector('.column--3');
  _column4 = document.querySelector('.column--4');
  _column5 = document.querySelector('.column--5');
  _expandSearchBtn = document.querySelector('.log--toggle-view');

  toggleDescription() {
    const columns = [this._column2, this._column3];
    columns.forEach(column => column.classList.toggle('left100vw'));
  }
  toggleDetailInformation() {
    const columns = [this._column4, this._column5];
    columns.forEach(column => column.classList.toggle('top100vh'));
  }

  toggleRotateExpandBtn() {
    this._expandSearchBtn.classList.toggle('arrow-rotate');
  }

  _generateMarkup(data) {}
}

export default new AnimationView();
