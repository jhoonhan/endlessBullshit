import * as config from '../config.js';
import View from './View.js';

class ScrollLogView extends View {
  _parentElement = document.querySelector('.scroll-log-container');
  _logResultContainer = document.querySelector('.log--results');
  _scroll0 = document.querySelector('.scroll--0');
  _scroll1 = document.querySelector('.scroll--1');
  _scroll2 = document.querySelector('.scroll--2');

  constructor() {
    super();
    this._getClickedLogIndex();
  }

  //
  //
  _clickedLogIndex = '';
  getMoveDirection(currentLogIndex) {
    if (!currentLogIndex || !this._clickedLogIndex) {
      console.log(`no log index`);
      return;
    }
    if (currentLogIndex > this._clickedLogIndex) return `down`;
    if (currentLogIndex < this._clickedLogIndex) return `up`;
    if (currentLogIndex === this._clickedLogIndex) return `same`;
  }
  _getClickedLogIndex() {
    this._logResultContainer.addEventListener(
      'click',
      function (e) {
        if (!e.target.dataset.index) return;
        this._clickedLogIndex = e.target.dataset.index;
        // console.log(this._clickedLog);
      }.bind(this)
    );
  }
  moveToNextLog(direction) {
    console.log(direction);
    if (direction === 'up') {
      // generate
      // removes hidden
      this._scroll0.classList.remove('hidden');
      this._scroll2.classList.add('hidden');
      // push them up
    }
    if (direction === 'down') {
      this._scroll0.classList.add('hidden');
      this._scroll2.classList.remove('hidden');
    }
  }
  renderScrolls(resultProx) {
    super.insertHTML(resultProx, this._parentElement);
  }
  moveToActiveScroll(activeIndex, qtScroll) {
    console.log(qtScroll);
    const scrolls = document.querySelectorAll('.scroll');
    console.log(activeIndex);
    scrolls.forEach(function (el) {
      if (+el.dataset.order !== +activeIndex)
        el.classList.remove('scroll--active');
      if (+el.dataset.order === +activeIndex)
        el.classList.add('scroll--active');
    });
    // const moveValue = `${100 * activeIndex}vh`;
    const moveValue = qtScroll * 100 + 0 - activeIndex * 100;
    this._parentElement.style.top = `-${moveValue}vh`;
  }
  //
  //
  _generateMarkup(data) {
    const generatedHTML = data
      .map(function (el, i) {
        return `
          <div class="scroll scroll--${i}" data-order="${i}">
          <div class="column column--4">
              <div class="cell cell--1 container-outer outer-shadow">
              <div class="container-artwork">
                  <div class="artwork-info artwork-frame" data-id="${el.id}" style="background-image: url(${el.imgURL})"></div>
              </div>
              </div>
              <div class="cell cell--2 artwork-tag log-tag">
              <span><i>Endless Bullshit</i>, ${el.name}, ${el.year}</span>
              </div>
          </div>
          <div class="column column--5">
              <div class="cell cell--1 artwork-title">
              <h1>Endless Bullshit</h1>
              </div>
              <div class="detail-information information">
                  <div class="cell cell--2 artwork-subtitle">
                  <h3>by ${el.name}, ${el.year}</h3>
                  </div>
                  <div class="cell cell--3 artwork-description">
                  <p>
                      ${el.statement}
                  </p>
                  </div>
              </div>
          </div>
          </div>
          `;
      })
      .reverse()
      .join(' ');

    return generatedHTML;
  }
}

export default new ScrollLogView();
