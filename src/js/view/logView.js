import * as config from '../config.js';
import View from './view.js';
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

  _description = document.querySelector('.description');
  _form = document.querySelector('.artwork__form');
  _row1 = document.querySelector('.section--2 .row--1');

  searchType = '';
  searchKeyword = '';

  constructor() {
    super();
    this.renderLogs();
  }

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

  renderLogs(data, isMobile) {
    if (!data) return;
    const location = isMobile
      ? this._logResultContainerMobile
      : this._logResultContainer;

    super.insertHTML(data, location);
  }

  scrollIntoView(id, isMobile) {
    const location = isMobile
      ? this._logResultContainerMobile
      : this._logResultContainer;
    const ref = location.querySelector(`[data-id='${id}']`);
    console.log(ref);
    if (!ref) return;

    const x = ref.getBoundingClientRect().top;
    const y = location.clientHeight;
    const z = location.scrollTop;
    const newPosition = x - y / 2 + z - 12;

    if (!isMobile) {
      location.scrollTo({
        top: newPosition,
        behavior: 'smooth',
      });
    }
    if (isMobile) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  }

  highlightActiveLog(id, isMobile) {
    const location = isMobile
      ? this._logResultContainerMobile
      : this._logResultContainer;

    const logs = location.querySelectorAll('.log__logs');
    const active = location.querySelector(`[data-id='${id}']`);

    if (!active) return;

    logs.forEach(function (log) {
      if (log.dataset.id === active.dataset.id) {
        log.classList.add('highlighted-text');
      } else {
        log.classList.remove('highlighted-text');
      }
    });
  }

  getLogPosition() {
    const rect = this._row1.getBoundingClientRect();
    if (rect.x >= 300) return false;
    if (rect.x < 300) return true;
  }

  getSearchValue(isMobile) {
    return isMobile
      ? [this._searchInputMobile.value, this._searchDropdownOptionsMobile.value]
      : [this._searchInput.value, this._searchDropdownOptions.value];
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
