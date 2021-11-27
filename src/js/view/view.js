export default class View {
  _data;

  insertHTML(data) {
    if (!data) return;

    // this._data = data;
    [dataHTML, locationHTML] = data;
    this._clear(locationHTML);
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
