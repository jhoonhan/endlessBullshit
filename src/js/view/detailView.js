import * as config from '../config.js';
import View from './View.js';

class DetailView extends View {
  _parentElement = document.querySelector('.scroll--1 .detail-information');

  addDetailInformation(data) {
    super.insertHTML(data, this._parentElement);
  }

  generateScrollLogs(data) {}

  _generateMarkup(data) {
    return `
    <div class="cell cell--2 artwork__subtitle">
        <h3>by ${this.capitalizeName(data.name)}, ${data.year}</h3>
    </div>
    <div class="cell cell--3 artwork__description">
        <p>
        &quot${data.statement}&quot
        </p>
    </div>
    `;
  }
}

export default new DetailView();
