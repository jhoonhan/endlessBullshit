import * as config from '../config.js';
import View from './View.js';

class DescriptionView extends View {
  _parentElement = document.querySelector('.description');

  addDescription(data) {
    super.insertHTML(data, this._parentElement);
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
    <button class="btn--submit">This is bullshit</button>
    `;
  }
}

export default new DescriptionView();
