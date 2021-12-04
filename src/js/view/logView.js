import * as config from '../config.js';
import View from './View.js';

class LogView extends View {
  _parentElement = document.querySelector('.log--container');
  _logResultContainer = document.querySelector('.log--results');
  _logs = document.querySelectorAll('.log--logs');
  _btnToggleView = document.querySelector('.log--toggle-view');
  _btnSearchDropdown = document.querySelector('.log--serach--dropdown');
  _searchDropdownOptions = document.querySelector(
    '.log--search--dropdown-options'
  );
  _searchForm = document.querySelector('.log--search--form');
  _searchInput = document.querySelector('.log--serach--input');
  _byName = document.querySelector('.by-name');
  _byOrder = document.querySelector('.by-order');
  _byID = document.querySelector('.by-id');

  _description = document.querySelector('.description');
  _form = document.querySelector('.form-artwork');

  _searchType = 'name';
  _view = '';
  _node = '';

  constructor() {
    super();
    this.renderLogs();
    this._addHandlerSearchOption();
  }

  renderLogs(data) {
    if (!data) return;
    super.insertHTML(data, this._logResultContainer);
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

  addHandlerToggleView(handler) {
    this._btnToggleView.addEventListener('click', handler);
    // this._btnToggleView.addEventListener(
    //   'mouseover',
    //   function () {
    //     this._parentElement.style.left = '0px';
    //   }.bind(this)
    // );

    // this._btnToggleView.addEventListener(
    //   'mouseout',
    //   function () {
    //     this._parentElement.style.left = '-100px';
    //   }.bind(this)
    // );
  }

  toggleView() {
    const width = this._parentElement.classList.toggle('left-100vw');

    // opening search will hide form
    this._description.classList.remove('hidden');
    this._form.classList.add('hidden');

    if (this._btnToggleView.dataset.type === 'open')
      this._btnToggleView.dataset.type = 'close';
    else this._btnToggleView.dataset.type = 'open';
  }

  addHandlerLogRender(handler) {
    ['hashchange'].forEach(ev => window.addEventListener(ev, handler));
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

    const getProximiyIndex = function (keyIndex) {
      const prox = [];
      for (let i = 0; i < 5; i++) {
        prox.push(keyIndex - Math.floor(5 / 2) + i);
      }
      return prox;
    };
    const getResultProx = function (data, keyIndex) {
      const proximity = getProximiyIndex(keyIndex);
      return data.filter(
        el => proximity[0] <= el.index && el.index <= proximity.slice(-1)
      );
    };

    if (this._searchType === 'order') {
      const resultAccu = data.filter(el => el.index === +keyword);
      const resultProx = getResultProx(data, keyword);

      return [resultAccu, resultProx];
    }
    if (this._searchType === 'name') {
      const resultAccu = data.filter(el => el.name.includes(keyword));
      const resultProx = resultAccu;

      return [[resultAccu[0]], resultProx];
    }
    if (this._searchType === 'id') {
      const resultAccu = data.filter(el => el.id === keyword);
      const keyIndex = resultAccu[0].index;
      const resultProx = getResultProx(data, keyIndex);

      return [resultAccu, resultProx];
    }
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

    this._byOrder.addEventListener('click', this._searchByOrder.bind(this));

    this._byID.addEventListener('click', this._searchByID.bind(this));
  }
  _searchByName() {
    this._searchType = 'name';
  }
  _searchByOrder() {
    this._searchType = 'order';
    console.log(`search by order`);
  }
  _searchByID() {
    this._searchType = 'id';
  }
}

export default new LogView();
