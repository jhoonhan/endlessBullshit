import * as config from '../config.js';
import View from './View.js';

class LogView extends View {
  _parentElement = document.querySelector('.log--results');
  _logs = document.querySelectorAll('.log-logs');
  _btnSearchDropdown = document.querySelector('.log--serach--dropdown');
  _searchDropdownOptions = document.querySelector(
    '.log--search--dropdown-options'
  );
  _searchForm = document.querySelector('.log--search--form');
  _byName = document.querySelector('.by-name');
  _byID = document.querySelector('.by-id');

  _searchType = '';

  constructor() {
    super();
    this.renderLatestLogs();
    this._init();
  }

  renderLatestLogs(data) {
    if (!data) return;
    super.insertHTML(data, this._parentElement);
  }

  _generateMarkup(data) {
    const logsPerPage = 10;
    const generatedHTML = data
      .slice(0, logsPerPage)
      .map(el => `<li><a href="#${el.id}" class="log-logs">${el.name}</a></li>`)
      .reverse()
      .join(' ');

    return generatedHTML;
  }

  addHandlerLogRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  getImageHashChange(data) {
    const hashID = window.location.hash.slice(1);
    const [resultID] = data.filter(obj => {
      return obj.id === hashID;
    });
    return resultID;
  }

  _searchBtnSQ1() {
    super.controlHidden(this._btnSearchDropdown, 'toggle');
    super.controlHidden(this._searchDropdownOptions, 'toggle');
  }
  _searchByName() {
    super.controlHidden(this._searchForm, 'remove');
    this._searchType = 'name';
  }
  _searchByID() {
    super.controlHidden(this._searchForm, 'remove');
    this._searchType = 'ID';
  }
  _init() {
    this._btnSearchDropdown.addEventListener(
      'click',
      this._searchBtnSQ1.bind(this)
    );
    this._byName.addEventListener('click', this._searchByName.bind(this));

    this._byID.addEventListener('click', this._searchByID.bind(this));
  }
}

export default new LogView();
