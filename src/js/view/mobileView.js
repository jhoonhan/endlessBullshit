import View from './view.js';

class MobileView extends View {
  _parentElement = document.querySelector('.section--m');
  _btnToggleView = document.querySelector('.log__btn--mobile');
  _artworkFrame = document.querySelector('.artwork-frame--mobile');
  _artworkContainer = document.querySelector('.mobile-artwork-container');

  addHandlerToggleView(handler) {
    this._btnToggleView.addEventListener('click', handler);
  }

  renderDetail(data) {
    super.insertHTML(data, this._artworkContainer);
  }
  renderArtwork(img) {
    const artworkFrame = document.querySelector('.artwork-frame--mobile');
    artworkFrame.style.backgroundImage = `url(${img})`;
  }
  _generateMarkup(data) {
    const [log, img, totalCount] = data;
    const year = log.date.slice(0, 4);
    const date = log.date.slice(0, 10);
    return `
      <div class="column column--m--1">
        <div class="artwork__container--outer shadow--outer">
          <div class="artwork__container">
            <div class="artwork-frame artwork-frame--mobile" style="background-image: url(${img})"
            </div>
          </div>
        </div>
        
      </div>
      <div class="column--m--2">
        <div class="cell cell--1 artwork__title">
          <h1>This Is Bullshit</h1>
        </div>
        <div class="detail-information information">
          <div class="cell cell--2 artwork__subtitle">
            <h3>by ${this.capitalizeName(log.name)}, ${year}</h3>
          </div>
          <div class="cell cell--3 artwork__description">
            <ul class="detail-data">
              <label class="scroll__label">Statement :</label>
              <li></li>
              <li class="scroll__statement"><p>"${log.statement}"</p></li>
              <label>Date :</label>
              <li><p>${date}</p></li>
              <label>Order :</label>
              <li><p>${log.order} out of ${totalCount}</p></li>
              <label>ID :</label>
              <li><p>${log._id}</p></li>
            </ul>
          </div>
        </div>
      </div>
          `;
  }
}
export default new MobileView();
