import * as config from '../config.js';
import View from './View.js';

class LogView extends View {
  _parentElement = document.querySelector('.log--results');
  _logs = document.querySelectorAll('.log-logs');

  constructor() {
    super();
    this.renderLatestLogs();
  }

  renderLatestLogs(data) {
    if (!data) return;
    super.insertHTML(data, this._parentElement);
  }

  _generateMarkup(data) {
    const logsPerPage = -10;
    const generatedHTML = data
      .slice(logsPerPage)
      .map(el => `<li><a href="#${el.id}" class="log-logs">${el.name}</a></li>`)
      .reverse()
      .join(' ');

    return generatedHTML;
  }

  addHandlerLogRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  getImageHashChange(data) {
    const hashID = window.location.hash.slice(1);
    const [resultID] = data.filter(obj => {
      return obj.id === hashID;
    });
    return resultID.imgURL;
  }
}

export default new LogView();
