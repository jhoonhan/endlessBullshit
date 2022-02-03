import * as config from '../config.js';
import View from './View.js';

class ScrollLogView extends View {
  _parentElement = document.querySelector('.scroll__container');
  _logResultContainer = document.querySelector('.log__results');
  _scroll0 = document.querySelector('.scroll--0');
  _scroll1 = document.querySelector('.scroll--1');
  _scroll2 = document.querySelector('.scroll--2');

  constructor() {
    super();
    this._getClickedLogIndex();

    this._parentElement.addEventListener(
      'scroll',
      this._scrollStateListener.bind(this)
    );
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
  highlightActiveScroll(activeID) {
    const scrolls = document.querySelectorAll('.scroll');
    scrolls.forEach(function (el) {
      if (el.dataset.id !== activeID) el.classList.remove('scroll--active');
      if (el.dataset.id === activeID) el.classList.add('scroll--active');
    });
  }

  _scrollStateListener() {
    const scrolls = document.querySelectorAll('.scroll');

    scrolls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        el.classList.add('scroll--active');
      } else {
        el.classList.remove('scroll--active');
      }
    });

    this._scrollStateLogHighlight();
  }

  _scrollStateLogHighlight() {
    const logs = document.querySelectorAll('.log__logs');
    const activeScroll = document.querySelector('.scroll--active');

    if (activeScroll) {
      const activeID = activeScroll.dataset.id;
      logs.forEach(log => {
        if (log.dataset.id === activeID) {
          log.classList.add('highlighted-text');
        } else {
          log.classList.remove('highlighted-text');
        }
      });
    }
  }

  _scrollStateLogScroll(reference, orientation, location) {
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

  moveToActiveScroll() {
    const active = document.querySelector('.scroll--active');
    active.scrollIntoView({ behavior: 'smooth' });
  }

  renderActiveScroll(img) {
    const active = document.querySelector('.scroll--active .artwork-frame');
    if (!active) return;
    active.style.backgroundImage = `url(${img})`;
  }

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
          }" data-id="${el._id}">
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
