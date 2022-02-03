import View from './View.js';
class InfinityView extends View {
  _parentElement = document.querySelector('.log__results');
  _logResultContainer = document.querySelector('.log__results');
  _logResultContainerMobile = document.querySelector('.log__results--mobile');

  addHandlerLogRenderInfinity(handler) {
    this._logResultContainer.addEventListener('scroll', handler);
  }

  // Infinity
  scrollListener() {
    const x = this._logResultContainer.clientHeight;
    const y = this._logResultContainer.scrollTop;
    const z = this._logResultContainer.scrollHeight;
    if (y === 0) return `top`;
    if (x + y + 1 <= z) return null;
    if (x + y + 1 > z) return `bottom`;
  }

  renderInfinity(data, type, orientation) {
    const generatedHTML = this._generateMarkup(data);
    this._parentElement.append(generatedHTML);
  }

  getLastLogID() {
    const logs = document.querySelectorAll('.log__logs');
    const lastLog = [...logs].at(-1);
    const lastLogID = lastLog.href.slice(-24);

    return lastLogID;
  }

  // Generate
  _generateMarkup(data) {
    console.log(data);
    const generatedHTML = data
      .map(el => {
        const convtName = this.convertName(el.name);
        return `<li><a href="#${el._id}" class="log__logs" data-index="${
          el.order
        }">${this.capitalizeName(convtName)}</a></li>`;
      })
      .reverse()
      .join(' ');

    return generatedHTML;
  }
}
export default new InfinityView();
