import * as config from '../config.js';
import View from './View.js';

class BetweenView extends View {
  _parentElement = document.querySelector('.top-level');
  _btnClose = document.querySelector('.btn--close-between');
  _message = document.querySelector('.top-level .message');

  constructor() {
    super();
    this._addHandlerHideWindow();
  }
  showBetween() {
    const message = `Your art has been submitted.`;
    this._message.innerHTML = '';
    this._message.innerHTML = message;
    this._toggleWindow();
  }

  _toggleWindow() {
    this._parentElement.classList.toggle('hidden');
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new BetweenView();
