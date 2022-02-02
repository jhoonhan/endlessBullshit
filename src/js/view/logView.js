import * as config from '../config.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class LogView extends View {
  _parentElement = document.querySelector('.log__container');

  _logResultContainer = document.querySelector('.log__results');
  _logMobileResultContainer = document.querySelector('.log__results--mobile');

  _logs = document.querySelectorAll('.log__logs');

  _btnToggleView = document.querySelector('.log__view--toggle');
  _btnSearchDropdown = document.querySelector('.log--search--dropdown');

  _searchDropdownOptions = document.querySelector(
    '.log--search--dropdown-options'
  );
  _searchDropdownOptionsMobile = document.querySelector(
    '.log__searchby--mobile'
  );

  _searchForm = document.querySelector('.log--search--form');
  _searchMobileForm = document.querySelector('.log__search__form--mobile');
  _searchInput = document.querySelector('.log__search__input');
  _searchInputMobile = document.querySelector('.log__search__input--mobile');

  _byName = document.querySelector('.by-name');
  _byOrder = document.querySelector('.by-order');
  _byID = document.querySelector('.by-id');

  _description = document.querySelector('.description');
  _form = document.querySelector('.artwork__form');
  _row1 = document.querySelector('.section--2 .row--1');

  _searchType = 'name';
  _view = '';
  _node = '';

  constructor() {
    super();
    this.renderLogs();
    this._addHandlerSearchOption();
    this.addHandlerSearchByOption();
  }

  addHandlerSearchByOption() {
    this._searchDropdownOptionsMobile.addEventListener('change', e => {
      const selectedOption = e.target.value;
      if (selectedOption === 'latest') {
        this._searchInputMobile.classList.add('hidden');
      } else {
        this._searchInputMobile.classList.remove('hidden');
      }
    });
  }

  addHandlerToggleView(handler) {
    this._btnToggleView.addEventListener('click', handler);
  }
  addHandlerLogRender(handler) {
    window.addEventListener('hashchange', handler);
  }
  addHandlerSearch(handler) {
    this._searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
    this._searchMobileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
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
  renderLogs(data, orientation) {
    if (!data) return;
    if (orientation === 'landscape') {
      super.insertHTML(data, this._logResultContainer);
    }
    if (orientation === 'portrait') {
      super.insertHTML(data, this._logMobileResultContainer);
    }
  }

  scrollToY(loc, ref, offset) {
    const reference = document.querySelector(ref);
    const location = document.querySelector(loc);
    const y = reference.getBoundingClientRect().top + offset;

    location.scrollTo({ top: y, behavior: 'smooth' });
  }

  scrollIntoView(reference) {
    const ref = document.querySelector(reference);
    ref.scrollIntoView({ behavior: 'smooth' });
  }

  getLogPosition() {
    const rect = this._row1.getBoundingClientRect();
    return rect.x;
  }

  highlightActiveLog() {
    const logs = document.querySelectorAll('.log__logs');
    const artworkInfo = document.querySelector('.scroll--active .artwork-info');

    // if (window.location.hash === '') return;
    // logs.forEach(function (log) {
    //   if (log.href.includes(window.location.hash)) {
    //     log.classList.add('highlighted-text');
    //   } else {
    //     log.classList.remove('highlighted-text');
    //   }
    // });
    if (!artworkInfo) return;
    logs.forEach(function (log) {
      if (log.href.slice(-24) === artworkInfo.dataset.id) {
        log.classList.add('highlighted-text');
      } else {
        log.classList.remove('highlighted-text');
      }
    });
  }

  highlightActiveLogMobile() {
    const logs = document.querySelectorAll('.log__results--mobile .log__logs');
    const activeArtwork = document.querySelector('.artwork-frame--mobile');
    logs.forEach(log => {
      if (log.href.slice(-24) === activeArtwork.dataset.id) {
        log.classList.add('highlighted-text--mobile');
      } else {
        log.classList.remove('highlighted-text--mobile');
      }
    });
  }

  // _addHandlerSearchSelector() {
  //   this._byName.addEventListener('click', function () {
  //     this._searchType = 'name';
  //     console.log(`search type: name`);
  //   });
  // }

  // _getProximiyIndex = function (data, keyIndex) {
  //   let prox = [];
  //   for (let i = 0; i < config.MAXSEARCHRESULT; i++) {
  //     prox.push(keyIndex - Math.floor(config.MAXSEARCHRESULT / 2) + i);
  //   }
  //   const largestNum = prox.slice(-1)[0];
  //   const largestIndex = data.length - 1;
  //   const smallestNum = prox[0];

  //   // When there is no element after
  //   if (largestNum > largestIndex) {
  //     const discrepancy = largestNum - largestIndex;
  //     const filteredProx = prox.filter(index => index <= largestIndex);

  //     for (let i = 1; i <= discrepancy; i++) {
  //       filteredProx.unshift(smallestNum - i);
  //     }
  //     prox = filteredProx;
  //   }

  //   // When there is no element before
  //   if (smallestNum < 0) {
  //     const filteredProx = prox.filter(index => index >= 0);
  //     const discrepancy = config.MAXSEARCHRESULT - filteredProx.length;

  //     for (let i = 0; i <= discrepancy; i++) {
  //       filteredProx.push(largestNum + i);
  //     }
  //     prox = filteredProx;
  //   }
  //   return prox;
  // };

  // _getResultProx = function (data, keyIndex) {
  //   const proximity = this._getProximiyIndex(data, keyIndex);
  //   return data.filter(
  //     el => el.index >= proximity[0] && el.index <= proximity.slice(-1)
  //   );
  // };

  getSearchInput() {
    return this._searchInput.value;
  }
  getSearchType() {
    return this._searchType;
  }

  getSearchValueMobile() {
    return [
      this._searchInputMobile.value,
      this._searchDropdownOptionsMobile.value,
    ];
  }

  _searchBtnSQ1() {
    // super.controlHidden(this._btnSearchDropdown, 'toggle');
    // super.controlHidden(this._searchDropdownOptions, 'toggle');
  }

  _searchByName() {
    this._searchType = 'name';
  }
  _searchByOrder() {
    this._searchType = 'order';
  }
  _searchByID() {
    this._searchType = 'id';
  }

  _convertName(name) {
    if (name.length > config.NAMESHORTEN) {
      if (name.split(' ').length > 1) {
        const firstInitial = name.split(' ')[0].slice(0, 1);
        const lastName = name.split(' ').slice(-1)[0];
        return `${firstInitial}. ${lastName}`;
      }
      if (name.split(' ').length <= 1) {
        return name.slice(0, 15);
      }
    } else return name;
  }
  _generateMarkup(data) {
    const generatedHTML = data
      .slice(0, config.MAXSEARCHRESULT)
      .map(
        function (el) {
          const convtName = this._convertName(el.name);
          return `<li><a href="#${el._id}" class="log__logs" data-index="${
            el.order
          }">${this.capitalizeName(convtName)}</a></li>`;
        }.bind(this)
      )
      .reverse()
      .join(' ');

    return generatedHTML;
  }
}

export default new LogView();
