import * as config from '../config.js';
import View from './View.js';

class ScrollLogView extends View {
  _parentElement = document.querySelector('.scroll-log-container');
  _logResultContainer = document.querySelector('.log__results');
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
  renderScrolls(data) {
    super.insertHTML(data, this._parentElement);
  }
  highlightActiveScroll(activeIndex) {
    const scrolls = document.querySelectorAll('.scroll');
    scrolls.forEach(function (el) {
      if (+el.dataset.index !== +activeIndex)
        el.classList.remove('scroll--active');
      if (+el.dataset.index === +activeIndex)
        el.classList.add('scroll--active');
    });
  }
  moveToActiveScroll(qtScroll) {
    const active = document.querySelector('.scroll--active');
    if (!active) return;

    const moveValue = qtScroll * 100 - active.dataset.order * 100;
    this._parentElement.style.transform = `translateY(-${moveValue}vh)`;
  }
  renderActiveScroll(img) {
    const active = document.querySelector('.scroll--active .artwork-frame');
    if (!active) return;
    active.style.backgroundImage = `url(${img})`;
  }
  //
  //
  getTotalNumber(totalNumber) {
    return totalNumber;
  }

  _generateMarkup(data) {
    const [resultProx, totalNumber] = data;

    const generatedHTML = resultProx
      .map(
        function (el, i) {
          const year = el.date.slice(0, 4);
          const date = el.date.slice(0, 10);
          return `
          <div class="scroll scroll--${i}" data-order="${i}" data-index="${
            el.order
          }"">
          <div class="column column--4">
              <div class="artwork__container--outer shadow--outer">
              <div class="artwork__container">
                  <div class="artwork-info artwork-frame" data-id="${
                    el._id
                  }" style="background-image: none">
                  </div>
              </div>
              </div>
              <div class="cell cell--2 artwork__tag log-tag">
              <span><i>This Is Bullshit</i>, ${this.capitalizeName(
                el.name
              )}, ${year}</span>
              </div>
          </div>
          <div class="column column--5">
              <div class="cell cell--1 artwork__title">
                <h1>This Is Bullshit</h1>
              </div>
              <div class="detail-information information">
                  <div class="cell cell--2 artwork__subtitle">
                  <h3>by ${this.capitalizeName(el.name)}, ${year}</h3>
                  </div>
                  <div class="cell cell--3 artwork__description">
                    <ul class="detail-data">
                      <label class="scroll__label">Statement :</label>
                      <li></li>
                      <li class="scroll__statement"><p>${el.statement}</p></li>
                      
                      <label>Date :</label>
                      <li><p>${date}/${year}</p></li>
                      <label>Order :</label>
                      <li><p>${el.order} out of ${totalNumber}</p></li>
                      <label>ID :</label>
                      <li><p>${el._id}</p></li>
                    </ul>
                  </div>
              </div>
          </div>
          </div>
          `;
        }.bind(this)
      )
      .reverse()
      .join(' ');

    if (resultProx.length > 0) {
      return generatedHTML;
    }
  }
}

export default new ScrollLogView();
