export default class View {
  _data;

  insertHTML(data, locationHTML) {
    if (!data || !locationHTML) return;

    // this._data = data;
    this._clear(locationHTML);
    const dataHTML = this._generateMarkup(data);
    locationHTML.insertAdjacentHTML('afterbegin', dataHTML);
  }

  _clear(locationHTML) {
    locationHTML.innerHTML = '';
  }
  renderSpinner(locationHTML) {
    const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
            `;
    this._clear(locationHTML);
    locationHTML.insertAdjacentHTML('afterbegin', markup);
  }
}
