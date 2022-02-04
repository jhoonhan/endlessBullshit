import View from './View.js';
class InfinityView extends View {
  _logResultContainer = document.querySelector('.log__results');
  _logResultContainerMobile = document.querySelector('.log__results--mobile');
  _scrollContainer = document.querySelector('.scroll__container');

  _orderedSearch = true;

  addHandlerLogRenderInfinity(handler) {
    this._logResultContainer.addEventListener('scroll', handler);
    this._logResultContainerMobile.addEventListener('scroll', handler);
  }

  // Infinity
  scrollListener(isMobile) {
    const location = isMobile
      ? this._logResultContainerMobile
      : this._logResultContainer;
    const x = location.clientHeight;
    const y = location.scrollTop;
    const z = location.scrollHeight;

    if (y === 0) {
      return `top`;
    }
    // if (x + y + 1 <= z) return null;
    if (x + y + 1 > z) return `bottom`;
  }
  isOrderedSearch(setValue) {
    this._orderedSearch = setValue;
    return state;
  }

  renderInfinity(doc) {
    const { data, totalNumber, direction, isMobile } = doc;
    const location = isMobile
      ? this._logResultContainerMobile
      : this._logResultContainer;

    // logs
    const generatedHTMLLog = this._generateMarkupLog(data);

    location.insertAdjacentHTML(
      `${direction ? 'afterbegin' : 'beforeend'}`,
      generatedHTMLLog
    );

    // Stops when Mobile
    if (isMobile) return;
    // Scrolls
    const generatedHTMLScroll = this._generateMarkupScroll([
      data,
      totalNumber,
      direction,
    ]);
    this._scrollContainer.insertAdjacentHTML(
      `${direction ? 'afterbegin' : 'beforeend'}`,
      generatedHTMLScroll
    );
  }

  catchInfinityLog(state, curLocation, isMobile) {
    if (!state) return;
    if (isMobile) return;
    const loc = document.querySelector('.log__results');
    const ref = loc.querySelector(`[data-id='${curLocation}']`);
    const x = ref.getBoundingClientRect().top;
    const y = loc.clientHeight;
    const z = loc.scrollTop;
    const w = loc.scrollHeight;
    const newPosition = x - y / 2 + z - 12;
    // console.log(x, y, z, w);

    loc.scrollTo({
      top: newPosition,
      behavior: 'smooth',
    });
  }

  getLastLogID(direction, isMobile) {
    const logs = document.querySelectorAll(
      `${isMobile ? '.log__container--mobile' : '.log__container'} .log__logs`
    );
    const lastLog = [...logs].at(direction ? 0 : -1);
    const lastLogID = lastLog.dataset.id;

    return lastLogID;
  }

  // Generate
  _generateMarkupLog(data) {
    const generatedHTML = data
      .map(el => {
        const convtName = this.convertName(el.name);
        return `<li><a href="#${el._id}" class="log__logs" data-index="${
          el.order
        }" data-id="${el._id}">${this.capitalizeName(convtName)}</a></li>`;
      })
      .join(' ');

    return generatedHTML;
  }

  _generateMarkupScroll(data) {
    const [results, totalNumber, type] = data;

    const queuedHTML = results.map(
      function (el, i) {
        const year = el.date.slice(0, 4);
        const date = el.date.slice(0, 10);

        `<div class="scroll" data-index="${el.order}" data-id="${el._id}">
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
          </div>`;
      }.bind(this)
    );
    const generatedHTML = direction
      ? queuedHTML.reverse().join(' ')
      : queuedHTML.join(' ');

    if (results.length > 0) {
      return generatedHTML;
    }
  }
}
export default new InfinityView();
