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
  _searchInput = document.querySelector('.log--serach--input');
  _byName = document.querySelector('.by-name');
  _byID = document.querySelector('.by-id');

  _searchType = 'name';
  _node = '';

  constructor() {
    super();
    this.renderLogs();
    this._addHandlerSearchOption();
  }

  renderLogs(data) {
    if (!data) return;
    super.insertHTML(data, this._parentElement);
  }

  _generateMarkup(data) {
    const logsPerPage = 10;
    const generatedHTML = data
      .slice(0, logsPerPage)
      .map(
        el =>
          `<li><a href="#${el.id}" class="log--logs">${this.capitalizeName(
            el.name
          )}</a></li>`
      )
      .reverse()
      .join(' ');

    return generatedHTML;
  }

  addHandlerLogRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    // window.addEventListener('hashchange', handler);
  }
  addHandlerSearch(handler) {
    this._searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  highlightActiveLog() {
    const logs = document.querySelectorAll('.log--logs');
    const artwork = document.querySelector('.artwork');

    // if (window.location.hash === '') return;
    // logs.forEach(function (log) {
    //   if (log.href.includes(window.location.hash)) {
    //     log.classList.add('highlighted-text');
    //   } else {
    //     log.classList.remove('highlighted-text');
    //   }
    // });
    logs.forEach(function (log) {
      if (log.href.slice(-36) === artwork.dataset.id) {
        log.classList.add('highlighted-text');
      } else {
        log.classList.remove('highlighted-text');
      }
    });
  }

  // _addHandlerSearchSelector() {
  //   this._byName.addEventListener('click', function () {
  //     this._searchType = 'name';
  //     console.log(`search type: name`);
  //   });
  // }

  search(data) {
    const keyword = this._searchInput.value.toLowerCase();
    let result;
    if (this._searchType === 'name') {
      result = data.filter(el => el.name.includes(keyword));
    }
    if (this._searchType === 'id') {
      result = data.filter(el => el.id.includes(keyword));
    }
    if (result.length === 0) console.log(`no results`);
    return result;
  }

  getImageHashChange(data) {
    const hashID = window.location.hash.slice(1);
    const [resultID] = data.filter(obj => {
      return obj.id === hashID;
    });
    return resultID;
  }

  _searchBtnSQ1() {
    // super.controlHidden(this._btnSearchDropdown, 'toggle');
    // super.controlHidden(this._searchDropdownOptions, 'toggle');
  }
  _addHandlerSearchOption() {
    this._btnSearchDropdown.addEventListener(
      'click',
      this._searchBtnSQ1.bind(this)
    );

    this._byName.addEventListener('click', this._searchByName.bind(this));

    this._byID.addEventListener('click', this._searchByID.bind(this));
  }
  _searchByName() {
    this._searchType = 'name';
    console.log(`search by name`);
  }
  _searchByID() {
    this._searchType = 'id';
    console.log(`search by id`);
  }
}

export default new LogView();
