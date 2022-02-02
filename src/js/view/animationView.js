import * as config from '../config.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AnimationView extends View {
  _section1 = document.querySelector('.section--1');
  _section2 = document.querySelector('.section--2');
  _sectionM = document.querySelector('.section--m');
  _column1 = document.querySelector('.column--1');
  _column2 = document.querySelector('.column--2');
  _column3 = document.querySelector('.column--3');
  _column4 = document.querySelector('.column--4');
  _column5 = document.querySelector('.column--5');
  _columnM3 = document.querySelector('.column--m--3');
  _row1 = document.querySelector('.row--1');
  _row2 = document.querySelector('.row--2');
  _row3 = document.querySelector('.row--3');

  // Main page
  _artworkPage = document.querySelector('.artworkPage');
  _container = document.querySelector('.container');
  //

  // Log view
  _logContainer = document.querySelector('.log__container');
  _scrollContainer = document.querySelector('.scroll-log-container');
  _description = document.querySelector('.description');
  _form = document.querySelector('.artwork__form');
  //
  // Serach view
  _expandSearchBtn = document.querySelector('.log__view--toggle');
  _searchDropdown = document.querySelector('.log__search__box');
  //
  // Search box
  _searchContainer = document.querySelector('.log__search__container');
  _searchExpandBtn = document.querySelector('.log__search--expand');
  _searchDropdownOptions = document.querySelector('.log__searchby');
  _searchDropdownOptionsMobile = document.querySelector(
    '.log__searchby--mobile'
  );
  // _searchOptions = document.querySelectorAll('.log__search__option a');

  _searchForm = document.querySelector('.log__search__form');
  _searchMobileForm = document.querySelector('.log__search__form--mobile');
  _searchInput = document.querySelector('.log__search__input');
  _searchInputMobile = document.querySelector('.log__search__input--mobile');

  //

  // Introduction
  _intro = document.querySelector('.introduction');
  _introCloseBtn = document.querySelector('.btn--close--intro');
  _introArtworkContainer = document.querySelector('.intro__container');
  _introDescription = document.querySelector('.intro__text');
  _introTitle = document.querySelector('.introduction .artwork__title');
  _introSubtitle = document.querySelector('.introduction .artwork__subtitle');
  _introStatement = document.querySelector('.intro--statement');
  //

  // Mobile
  _btnMobileResultToggle = document.querySelector(
    '.log__results--mobile--toggle'
  );
  _btnMobileArchiveToggle = document.querySelector(
    '.log__archive--mobile--toggle'
  );
  _btnToggleView = document.querySelector('.log__btn--mobile');

  leftSectionWidth;
  archiveOpened = true;

  constructor() {
    super();
    this._initSearchView();
    this._animateSearchBoxListeners();
    this._animateIntroListeners();
    this._animateIntro();
    this._animateMobileResultListener();
    // this._animateMobileArchiveListener();
  }

  // _animateMobileArchiveListener() {
  //   this._btnToggleView.addEventListener(
  //     'click',
  //     function () {
  //       this._animateMobileArchive();
  //     }.bind(this)
  //   );
  // }
  // animateToggleMobileSearchView() {
  //   // this._toggleSerachMobileView();
  // }
  animateMobileArchive() {
    this._sectionM.classList.toggle('top0');
    // this._section2.classList.toggle('overflow--hidden');
    document.body.classList.toggle('overflow--hidden');

    const rect = this._sectionM.getBoundingClientRect();
    // closed so open
    if (rect.y < 0) {
      this._columnM3.classList.remove('transfrom-y__40vh');
      this._columnM3.classList.remove('transfrom-y__40vh-4rem');
    }
    // opened so close
    if (rect.y >= 0) {
      this._columnM3.classList.remove('transfrom-y__40vh-4rem');
      this._columnM3.classList.add('transfrom-y__40vh');
    }
    this._btnMobileArchiveToggle.classList.toggle('arrow-bottom');
    this._btnMobileArchiveToggle.classList.toggle('arrow-rotate--top');
    // this._btnMobileArchiveToggle.classList.toggle('transfrom-y__1rem');
  }
  _animateMobileResultListener() {
    this._btnMobileResultToggle.addEventListener(
      'click',
      function () {
        this._animateMobileResult();
      }.bind(this)
    );
  }
  _animateMobileResult() {
    this._columnM3.classList.toggle('transfrom-y__40vh-4rem');

    this._btnMobileResultToggle.classList.toggle('arrow-bottom');
    this._btnMobileResultToggle.classList.toggle('arrow-rotate--top');
  }
  _animateIntroListeners() {
    this._introCloseBtn.addEventListener(
      'click',
      function () {
        this._animateIntro(1);
      }.bind(this)
    );
  }
  _animateIntro(sequence) {
    setTimeout(
      function () {
        this._introTitle.classList.toggle('transfrom-x__200vw');
      }.bind(this),
      100
    );

    setTimeout(
      function () {
        this._introArtworkContainer.classList.toggle('transfrom-x__-100vw');
      }.bind(this),
      500
    );

    setTimeout(
      function () {
        this._introSubtitle.classList.toggle('transfrom-x__200vw');
      }.bind(this),
      700
    );

    setTimeout(
      function () {
        this._introStatement.classList.toggle('transfrom-x__200vw');
      }.bind(this),
      800
    );

    setTimeout(
      function () {
        this._introCloseBtn.classList.toggle('transfrom-x__200vw');
      }.bind(this),
      1000
    );
    if (sequence === 1) {
      setTimeout(
        function () {
          this._intro.classList.toggle('opacity0');
        }.bind(this),
        1000
      );

      setTimeout(
        function () {
          this.controlHidden(this._intro, 'add');
        }.bind(this),
        0 // !LC to 4000
      );
    }
  }
  _animateSearchBoxListeners() {
    this._searchExpandBtn.addEventListener('click', () => {
      this._searchDropdownOptions.classList.toggle('hidden');
      this._searchForm.classList.toggle('hidden');
      // this._searchInput.value = '';
      this._searchInput.focus();
    });

    this._searchForm.addEventListener('submit', e => {
      e.preventDefault();
      this._searchDropdownOptions.classList.add('hidden');
      this._searchForm.classList.add('hidden');
    });

    this._searchDropdownOptions.addEventListener('change', e => {
      if (e.target.value === 'latest') {
        this._searchForm.classList.remove('hidden');
        this._searchInput.classList.add('hidden');
      }
      if (e.target.value !== 'latest') {
        this._searchForm.classList.remove('hidden');
        this._searchInput.classList.remove('hidden');
      }
    });
    this._searchDropdownOptionsMobile.addEventListener('change', e => {
      if (e.target.value === 'latest') {
        this._searchInputMobile.classList.add('hidden');
      } else {
        this._searchInputMobile.classList.remove('hidden');
      }
    });
  }
  //

  _getWidthWhenResize() {
    window.addEventListener(
      'resize',
      function () {
        this.leftSectionWidth =
          this._logContainer.getBoundingClientRect().width;

        // if (this.leftSectionWidth > 1000) return;
        // this._logContainer.style.left = `-${this.leftSectionWidth + 1}px`;
        if (this.leftSectionWidth > 1000) return;
        this._logContainer.style.left = 0;
      }.bind(this)
    );
  }
  _initSearchView() {
    // const left = this._logContainer.getBoundingClientRect().width;

    this._logContainer.classList.remove('transfrom-x__-100vw');
  }

  _toggleSerachView(rect) {
    this._logContainer.classList.toggle('transfrom-x__0');
    this._section2.classList.toggle('transfrom-x__0');
  }
  _toggleScrollView(rect) {
    if (rect.x < 0) {
      this._row1.classList.toggle('transfrom-x__100vw');
      this._row2.classList.toggle('transfrom-y__-100vh');
      this._expandSearchBtn.classList.toggle('arrow-rotate');
      // setTimeout(this.renderSpinner('remove'), 3000);
      // this.renderSpinner('remove');
    }
    if (rect.x >= 0) {
      this._row1.classList.toggle('transfrom-x__100vw');
      this._row2.classList.toggle('transfrom-y__-100vh');
      this._expandSearchBtn.classList.toggle('arrow-rotate');

      // this._scrollContainer.style.top = '0';
      this._scrollContainer.style.transform = 'translateY(0)';
      // setTimeout(this.renderSpinner('remove'), 3000);

      // this.renderSpinner('remove');
    }

    // this._row1.classList.toggle('transfrom-x__100vw');
    // // this._row2.classList.toggle('transfrom-y__-100vh');
    // this._expandSearchBtn.classList.toggle('arrow-rotate');
  }
  _toggleSerachMobileView() {}

  animateToggleSearchView() {
    const rect = this._logContainer.getBoundingClientRect();
    // const sequence0 = function () {
    //   this._row1.classList.toggle('transfrom-x__100vw');
    //   this._row2.classList.toggle('transfrom-y__-100vh');
    //   this._expandSearchBtn.classList.toggle('arrow-rotate');
    // }.bind(this);
    // console.log(rect);
    // this._container.classList.toggle('grid-adjuster');

    this._section1.classList.toggle('transfrom-x__200px');
    this._toggleSerachView(rect);
    this._toggleScrollView(rect);

    // opening search will hide form
    this._description.classList.remove('hidden');
    this._form.classList.add('hidden');
  }
}

export default new AnimationView();
