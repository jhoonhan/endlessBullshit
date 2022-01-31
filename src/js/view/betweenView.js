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
    this._toggleWindow();
  }

  _toggleWindow() {
    this._parentElement.classList.toggle('hidden');
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      'click',
      function () {
        this._toggleWindow();
      }.bind(this)
    );
  }
  render(data) {
    super.insertHTML(data, this._parentElement);
  }
  addDownloadButton(id, img64) {
    const locationHTML = document.querySelector('.between__container__buttons');
    const dataHTML = `
    <a class="button btn--50 btn--download" download="test.png" href="${img64}">download
    </a>
    <button class="btn--large btn--close-between">next</button>
    `;
    locationHTML.innerHTML = '';
    locationHTML.insertAdjacentHTML('afterbegin', dataHTML);
  }

  _generateMarkup(data) {
    const img64 = data[1];

    const log = data[0];
    const { name, _id, order } = log;
    const formattedName = `${name
      .split(' ')
      .map(el => el.slice(0, 1).toUpperCase() + el.slice(1))
      .join(' ')}`;
    const fileName = `${name.split(' ').join('-')}--${_id}.png`;
    return `
      <div class="between--fullsize">
        <div class="between__container">
          <span class="message">Your artwork has been submitted.</span>
          <ul class="between__information">
            <label>Name</label>
            <label class="column">:</label>
            <li>${formattedName}</li>
            <label>Order</label>
            <label class="column">:</label>
            <li>${order}</li>
            <label>ID</label>
            <label class="column">:</label>
            <li>${_id}</li>
          </ul>
          <div class="between__container__buttons">
            <a class="button btn--50 btn--download" download="${fileName}" href="${img64}">download
            </a>  
            <button class="btn--large btn--close-between">next</button>
          </div>
        </div>
      </div>
      `;
  }
}

export default new BetweenView();
