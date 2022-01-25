import * as config from '../config.js';
import View from './View.js';

class AnimationView extends View {
  _section1 = document.querySelector('.section--1');
  _section2 = document.querySelector('.section--2');
  _column1 = document.querySelector('.column--1');
  _column2 = document.querySelector('.column--2');
  _column3 = document.querySelector('.column--3');
  _column4 = document.querySelector('.column--4');
  _column5 = document.querySelector('.column--5');
  _row1 = document.querySelector('.row--1');
  _row2 = document.querySelector('.row--2');
  _row3 = document.querySelector('.row--3');

  // Main page
  _artworkPage = document.querySelector('.artworkPage');
  _container = document.querySelector('.container');
  //

  // Log view
  _logContainer = document.querySelector('.log--container');
  _scrollContainer = document.querySelector('.scroll-log-container');
  _description = document.querySelector('.description');
  _form = document.querySelector('.form-artwork');
  _btnToggleView = document.querySelector('.log--toggle-view');
  //
  // Serach view
  _expandSearchBtn = document.querySelector('.log--toggle-view');
  //
  // Search box
  _searchContainer = document.querySelector('.log--search--container');
  _searchExpandBtn = document.querySelector('.log--search--expand');
  _searchDropdown = document.querySelector('.log--search--dropdown');
  _searchOptionContainer = document.querySelector('.log--search--options');
  _searchOptions = document.querySelectorAll('.log--search--option a');
  _searchForm = document.querySelector('.log--search--form');
  _searchInput = document.querySelector('.log--search--input');
  //

  // Introduction
  _intro = document.querySelector('.introduction');
  _introCloseBtn = document.querySelector('.btn--close--intro');
  _introArtworkContainer = document.querySelector('.intro--container');
  _introDescription = document.querySelector('.intro--text');
  _introTitle = document.querySelector('.introduction .artwork-title');
  _introSubtitle = document.querySelector('.introduction .artwork-subtitle');
  _introStatement = document.querySelector('.intro--statement');
  //

  leftSectionWidth;

  constructor() {
    super();
    this._initSearchView();
    this._animateSearchBoxListeners();
    this._animateIntroListeners();
    this._animateIntro();
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
        this._introTitle.classList.toggle('right-100vw');
      }.bind(this),
      100
    );

    setTimeout(
      function () {
        this._introArtworkContainer.classList.toggle('left-100vw');
      }.bind(this),
      500
    );

    setTimeout(
      function () {
        this._introSubtitle.classList.toggle('right-100vw');
      }.bind(this),
      700
    );

    setTimeout(
      function () {
        this._introStatement.classList.toggle('right-100vw');
      }.bind(this),
      800
    );

    setTimeout(
      function () {
        this._introCloseBtn.classList.toggle('right-100vw');
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
    this._searchExpandBtn.addEventListener(
      'click',
      function () {
        this.animateSearchBox(1);
      }.bind(this)
    );

    this._searchOptions.forEach(
      function (btn) {
        btn.addEventListener(
          'click',
          function (e) {
            this.animateSearchBox(2);
            e.target.classList.toggle('highlighted-text');
          }.bind(this)
        );
      }.bind(this)
    );

    this._searchForm.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        this.animateSearchBox(3);
      }.bind(this)
    );
  }

  animateSearchBox(index) {
    if (index === 1) {
      this._searchOptionContainer.classList.toggle('hidden');
      this._searchForm.classList.add('hidden');
    }
    if (index === 2) {
      this._searchForm.classList.remove('hidden');
      this._searchOptions.forEach(a => a.classList.remove('highlighted-text'));

      this._searchInput.value = '';
      this._searchInput.focus();
    }
    if (index === 3) {
      this._searchOptionContainer.classList.add('hidden');
      this._searchForm.classList.add('hidden');
      this._searchOptions.forEach(a => a.classList.remove('highlighted-text'));
    }
  }

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

    this._logContainer.classList.remove('left-100vw');
  }

  _toggleSerachView(rect) {
    // if (rect.x < 0) {
    //   this._logContainer.classList.toggle('right0');
    //   this._section2.classList.toggle('left0');
    // }
    // if (rect.x >= 0) {
    //   this._logContainer.classList.toggle('right0');
    //   this._section2.classList.toggle('left0');
    // }
    this._logContainer.classList.toggle('right0');
    this._section2.classList.toggle('left0');
  }
  _toggleScrollView(rect) {
    if (rect.x < 0) {
      // this._row1.classList.toggle('left100vw');
      // setTimeout(
      //   function () {
      //     this._row2.classList.toggle('top100vh');
      //   }.bind(this),
      //   1000
      // );
      // this._expandSearchBtn.classList.toggle('arrow-rotate');
      //
      this._row1.classList.toggle('left100vw');
      this._row2.classList.toggle('top100vh');
      this._expandSearchBtn.classList.toggle('arrow-rotate');
    }
    if (rect.x >= 0) {
      // this._row1.classList.toggle('left100vw');
      // setTimeout(
      //   function () {
      //     this._row2.classList.toggle('top100vh');
      //   }.bind(this),
      //   1000
      // );
      // this._expandSearchBtn.classList.toggle('arrow-rotate');

      // this._scrollContainer.style.top = '0';
      //
      this._row1.classList.toggle('left100vw');
      this._row2.classList.toggle('top100vh');
      this._expandSearchBtn.classList.toggle('arrow-rotate');

      this._scrollContainer.style.top = '0';
    }

    // this._row1.classList.toggle('left100vw');
    // // this._row2.classList.toggle('top100vh');
    // this._expandSearchBtn.classList.toggle('arrow-rotate');

    // this._scrollContainer.classList.toggle('top0');
  }

  animateToggleSearchView() {
    const rect = this._logContainer.getBoundingClientRect();
    // const sequence0 = function () {
    //   this._row1.classList.toggle('left100vw');
    //   this._row2.classList.toggle('top100vh');
    //   this._expandSearchBtn.classList.toggle('arrow-rotate');
    // }.bind(this);
    console.log(rect);
    // this._container.classList.toggle('grid-adjuster');
    this._toggleSerachView(rect);
    this._toggleScrollView(rect);

    // opening search will hide form
    this._description.classList.remove('hidden');
    this._form.classList.add('hidden');
  }
}

export default new AnimationView();
