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

  _searchType = '';
  _node = '';

  constructor() {
    super();
    this.renderLogs();
    this._getClickedNode();

    this._btnSearchDropdown.addEventListener(
      'click',
      this._searchBtnSQ1.bind(this)
    );
    this._byName.addEventListener('click', this._searchByName.bind(this));

    this._byID.addEventListener('click', this._searchByID.bind(this));
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
          `<li><a href="#${el.id}" class="log-logs">${this.capitalizeName(
            el.name
          )}</a></li>`
      )
      .reverse()
      .join(' ');

    return generatedHTML;
  }

  addHandlerLogRender(handler) {
    window.addEventListener('hashchange', handler);
  }
  addHandlerSearch(handler) {
    this._searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  _getClickedNode() {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        this._node = e.target;
      }.bind(this)
    );
  }
  highlightActiveLog() {
    console.log(this._node.href);
    console.log(window.location.hash);
    if (this._node.href.includes(window.location.hash)) {
      console.log(`aaang`);
      this._node.classList.add('highlighted-text');
    }
    // let clicked;
    // console.log(window.location.hash);
    // this._parentElement.onclick = e => {
    //   clicked = e.target;
    //   console.log(clicked);
    // };
    // console.log(clicked);
    // this._parentElement.onclick = function (e) {
    //   const clicked = e.target;
    //   console.log(clicked.href);
    //   if (clicked.href.includes(window.location.hash)) {
    //     console.log(`aaang`);
    //     clicked.style.color = 'red';
    //   }
    // };
    // logs.forEach(function (log) {
    //   if (log.href.includes(window.location.hash)) log.style.color = 'red';
    //   if (!log.href.includes(window.location.hash)) log.style.color = 'black';
    // });
  }

  search(data) {
    const keyword = this._searchInput.value.toLowerCase();
    console.log(keyword);
    console.log(data);
    const result = data.filter(el => el.name.includes(keyword));
    if (!result) console.log(`no result found`);
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
  _searchByName() {
    super.controlHidden(this._searchForm, 'remove');
    this._searchType = 'name';
  }
  _searchByID() {
    super.controlHidden(this._searchForm, 'remove');
    this._searchType = 'ID';
  }
}

export default new LogView();
