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
    this._parentElement.addEventListener(
      'scroll',
      this._scrollStateListener.bind(this)
    );
  }

  // Moving
  _scrollStateListener() {
    const scrolls = document.querySelectorAll('.scroll');

    scrolls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        el.classList.add('scroll--active');
        // Changes hash location
        window.location.hash = `#${el.dataset.id}`;
      } else {
        el.classList.remove('scroll--active');
      }
    });
  }
  moveToActiveScroll(id) {
    const active = this._parentElement.querySelector(`[data-id='${id}']`);

    if (!active) return;

    active.scrollIntoView({ behavior: 'smooth' });
  }

  //
  // Rendering
  renderScrolls(data) {
    super.insertHTML(data, this._parentElement);
  }
  highlightActiveScroll(activeID) {
    const scrolls = document.querySelectorAll('.scroll');

    scrolls.forEach(el => {
      if (el.dataset.id === activeID) {
        el.classList.add('scroll--active');
      }
      if (el.dataset.id !== activeID) {
        el.classList.remove('scroll--active');
      }
    });
  }
  renderActiveScroll(img) {
    const active = document.querySelector('.scroll--active .artwork-frame');
    if (!active) return;
    active.style.backgroundImage = `url(${img})`;
  }
  _generateMarkup(data) {
    const [resultProx, totalNumber] = data;

    const generatedHTML = resultProx
      .map(
        function (el, i) {
          const year = el.date.slice(0, 4);
          const date = el.date.slice(0, 10);
          return `
          <div class="scroll scroll--${i}" data-index="${el.order}" data-id="${
            el._id
          }">
          <div class="column column--4">
              <div class="artwork__container--outer shadow--outer">
              <div class="artwork__container">
                  <div class="artwork-info artwork-frame">
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
