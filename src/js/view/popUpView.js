import View from './View.js';

class PopUpView extends View {
  _loadingContainer = document.querySelector('.loading__container');

  _errorContainer = document.querySelector('.error__container');
  _errorMessage = document.querySelector('.error__container__message');
  _errorToggleView = document.querySelector('.error__container--toggle');

  constructor() {
    super();
    this._errorToggleView.addEventListener(
      'click',
      this._toggleErrorView.bind(this)
    );
  }

  // Error
  _toggleErrorView() {
    this._errorContainer.classList.remove('visibilityVisible');
  }

  renderErrorPrompt(message) {
    this._errorContainer.classList.add('visibilityVisible');

    this.insertHTML(message, this._errorMessage);
  }
  _generateMarkup(message) {
    const generatedHTML = `${message}`;
    return generatedHTML;
  }

  // Spinner
  controlSpinner(type = 'toggle') {
    if (type === 'add') {
      this._loadingContainer.classList.add('visibilityVisible');
    }
    if (type === 'remove') {
      this._loadingContainer.classList.remove('visibilityVisible');
    }
    if (type === 'toggle') {
      this._loadingContainer.classList.toggle('visibilityVisible');
    }
  }
}
export default new PopUpView();
