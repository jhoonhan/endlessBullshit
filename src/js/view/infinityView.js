import View from './View.js';
class InfinityView extends View {
  _logResultContainer = document.querySelector('.log__results');
  _logResultContainerMobile = document.querySelector('.log__results--mobile');
  _scrollContainer = document.querySelector('.scroll__container');

  addHandlerLogRenderInfinity(handler) {
    this._logResultContainer.addEventListener('scroll', handler);
  }

  // Infinity
  scrollListener() {
    const x = this._logResultContainer.clientHeight;
    const y = this._logResultContainer.scrollTop;
    const z = this._logResultContainer.scrollHeight;

    if (y === 0) return `top`;
    // if (x + y + 1 <= z) return null;
    if (x + y + 1 > z) return `bottom`;
  }

  renderInfinity(doc) {
    const { data, totalNumber, state, orientation, lastScrollOrder } = doc;

    // logs
    const generatedHTMLLog = this._generateMarkupLog(data);

    this._logResultContainer.insertAdjacentHTML(
      `${state ? 'afterbegin' : 'beforeend'}`,
      generatedHTMLLog
    );

    // Scrolls
    const generatedHTMLScroll = this._generateMarkupScroll([
      data,
      totalNumber,
      state,
      lastScrollOrder,
    ]);
    this._scrollContainer.insertAdjacentHTML(
      `${state ? 'afterbegin' : 'beforeend'}`,
      generatedHTMLScroll
    );
  }

  getLastLogID(state, orientation) {
    const logs = document.querySelectorAll(
      `${
        orientation ? '.log__container--mobile' : '.log__container'
      } .log__logs`
    );
    const lastLog = [...logs].at(state ? 0 : -1);
    const lastLogID = lastLog.dataset.id;

    return lastLogID;
  }
  getLastScrollOrder(state) {
    const scrolls = document.querySelectorAll('.scroll');
    const lastScroll = [...scrolls].at(state ? 0 : -1);
    console.log(lastScroll);
    const lastScrollOrder = +lastScroll.dataset.order;
    return lastScrollOrder;
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
    const [results, totalNumber, type, lastOrder] = data;

    const generatedHTML = results
      .map(
        function (el, i) {
          const year = el.date.slice(0, 4);
          const date = el.date.slice(0, 10);

          // let newOrder;
          const resultsCount = results.length;

          let newOrder = type
            ? +lastOrder + resultsCount - i
            : +lastOrder - 1 - i;

          return `
          <div class="scroll" data-order="${newOrder}" data-index="${
            el.order
          }" data-id="${el._id}">
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
      .join(' ');

    if (results.length > 0) {
      return generatedHTML;
    }
  }
}
export default new InfinityView();
