import * as config from '../config.js';
import View from './View.js';

class DescriptionView extends View {
  _parentElement = document.querySelector('.description');
  _form = document.querySelector('.form-artwork');
  _textarea = document.querySelector('.input-form-textarea');
  _errorMessage = document.querySelector('.error-message--form');
  // _errorData = [];

  constructor() {
    super();
    this._characterCount();
  }

  artworkInputData() {
    const inputDataArr = [...new FormData(this._form)];
    const inputData = Object.fromEntries(inputDataArr);
    const isDataValid = this._inputDataValidate(inputData);

    // if (this._errorData.length > 0) return false;
    // if (this._errorData.length === 0) return inputData;
    if (isDataValid) {
      this._resetInputs();
      return inputData;
    }
    if (!isDataValid) return false;
  }
  _resetInputs() {
    const inputTexts = this._form.querySelectorAll('.input--text');
    const inputCheckBoxes = this._form.querySelectorAll('.checkbox');
    inputTexts.forEach(el => (el.value = ''));
    inputCheckBoxes.forEach(el => (el.checked = false));
  }
  _inputDataValidate(inputData) {
    const statement = inputData.statement;
    // this._errorData = [];
    if (statement.length < config.STATEMENTMIN) {
      this._errorMessage.innerHTML = '';
      this._errorMessage.innerHTML = `statment has to be at least ${config.STATEMENTMIN} characters.`;
      this._textarea.classList.add('error-box');
      return false;
    } else {
      this._textarea.classList.remove('error-box');
      return true;
    }
    // if (name.length < config.NAMEMIN) {
    //   console.log(`name too short`);
    //   this._errorData.push(`name too short`);
    // }
  }

  _characterCount() {
    const currentCount = document.querySelector('.current-count');
    const maximumCount = document.querySelector('.maximum-count');
    const textCount = document.querySelector('.text-count');
    this._textarea.addEventListener(
      'keyup',
      function () {
        let characterCount = this._textarea.value.length;
        currentCount.innerHTML = characterCount;
      }.bind(this)
    );
  }
  _invalidStatement() {
    const message = `Statment has to be at least ${config.STATEMENTMIN} characters.`;
  }

  addDescription(data) {
    super.insertHTML(data, this._parentElement);
    // attach event handler to the button
    this._attachEventHandler();
  }

  toggleWindow() {
    this._parentElement.classList.toggle('hidden');
    this._form.classList.toggle('hidden');
  }
  _attachEventHandler() {
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
        &quot${statement}&quot
        </p>
    </div>
    <button class="btn--hide-description">This is bullshit</button>
    `;
  }
}

export default new DescriptionView();
