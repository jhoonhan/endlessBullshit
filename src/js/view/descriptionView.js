import * as config from '../config.js';
import View from './View.js';

class DescriptionView extends View {
  _parentElement = document.querySelector('.description');
  _form = document.querySelector('.form-artwork');

  artworkInputData() {
    const inputDataArr = [...new FormData(this._form)];
    const inputData = Object.fromEntries(inputDataArr);
    return inputData;
  }
  addDescription(data) {
    super.insertHTML(data, this._parentElement);
    // attach event handler to the button
    this.attachEventHandler();
  }

  toggleWindow() {
    this._parentElement.classList.toggle('hidden');
    this._form.classList.toggle('hidden');
  }
  attachEventHandler() {
    const btnClose = document.querySelector('.btn--hide-description');
    btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup(data) {
    const [name, date, statement] = data;
    const year = '2222000011';
    return `
    <div class="cell cell--2 artwork-subtitle">
        <h3>by ${name}, ${date}</h3>
    </div>
    <div class="cell cell--3 artwork-description">
        <p>
        ${statement}
        </p>
    </div>
    <button class="btn--hide-description">This is bullshit</button>
    `;
  }
}

export default new DescriptionView();
