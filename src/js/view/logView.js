import * as config from '../config.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class LogView extends View {
  _parentElement = document.querySelector('.log__container');

  _logResultContainer = document.querySelector('.log__results');
  _logResultContainerMobile = document.querySelector('.log__results--mobile');

  _logs = document.querySelectorAll('.log__logs');

  _expandSearchBtn = document.querySelector('.log__view--toggle');
  _searchDropdown = document.querySelector('.log__search__box');

  _searchDropdownOptions = document.querySelector('.log__searchby');
  _searchDropdownOptionsMobile = document.querySelector(
    '.log__searchby--mobile'
  );

  _searchForm = document.querySelector('.log__search__form');
  _searchMobileForm = document.querySelector('.log__search__form--mobile');
  _searchInput = document.querySelector('.log__search__input');
  _searchInputMobile = document.querySelector('.log__search__input--mobile');

  // _byName = document.querySelector('.by-name');
  // _byOrder = document.querySelector('.by-order');
  // _byID = document.querySelector('.by-id');

  _description = document.querySelector('.description');
  _form = document.querySelector('.artwork__form');
  _row1 = document.querySelector('.section--2 .row--1');

  _view = '';
  _node = '';

  constructor() {
    super();
    this.renderLogs();

    // this._addHandlerSearchOption();
    // this._addHandlerSearchByOption();
  }

  // _addHandlerSearchOption() {
  //   this._byName.addEventListener('click', this._searchByName.bind(this));

  //   this._byOrder.addEventListener('click', this._searchByOrder.bind(this));

  //   this._byID.addEventListener('click', this._searchByID.bind(this));
  // }

  addHandlerToggleView(handler) {
    this._expandSearchBtn.addEventListener('click', handler);
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

  renderLogs(data, orientation) {
    if (!data) return;
    if (orientation === 'landscape') {
      super.insertHTML(data, this._logResultContainer);
    }
    if (orientation === 'portrait') {
      super.insertHTML(data, this._logResultContainerMobile);
    }
  }

  scrollIntoView(reference, orientation, location) {
    // Web
    if (location && orientation === 'landscape') {
      const ref = document.querySelector(reference);
      const loc = document.querySelector(location);
      const x = ref.getBoundingClientRect().top;
      const y = loc.clientHeight;
      const z = loc.scrollTop;
      const newPosition = x - y / 2 + z - 12;

      loc.scrollTo({
        top: newPosition,
        behavior: 'smooth',
      });
      return;
    }

    // Mobile
    if (orientation === 'portrait') {
      const ref = document.querySelector(reference);
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getLogPosition() {
    const rect = this._row1.getBoundingClientRect();
    return rect.x;
  }

  highlightActiveLog() {
    const logs = document.querySelectorAll('.log__logs');
    const activeScroll = document.querySelector('.scroll--active');

    if (!activeScroll) return;
    logs.forEach(function (log) {
      if (log.dataset.id === activeScroll.dataset.id) {
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

  getSearchValue() {
    return [this._searchInput.value, this._searchDropdownOptions.value];
  }
  getSearchValueMobile() {
    return [
      this._searchInputMobile.value,
      this._searchDropdownOptionsMobile.value,
    ];
  }

  // convertName(name) {
  //   if (name.length > config.NAMESHORTEN) {
  //     if (name.split(' ').length > 1) {
  //       const firstInitial = name.split(' ')[0].slice(0, 1);
  //       const lastName = name.split(' ').slice(-1)[0];
  //       return `${firstInitial}. ${lastName}`;
  //     }
  //     if (name.split(' ').length <= 1) {
  //       return name.slice(0, 15);
  //     }
  //   } else return name;
  // }

  //
  //
  // Generate
  _generateMarkup(data) {
    const generatedHTML = data
      .slice(0, config.MAXSEARCHRESULT)
      .map(el => {
        const convtName = this.convertName(el.name);
        return `<li><a href="#${el._id}" class="log__logs" data-index="${
          el.order
        }" data-id="${el._id}">${this.capitalizeName(convtName)}</a></li>`;
      })
      .reverse()
      .join(' ');

    return generatedHTML;
  }
}

export default new LogView();
