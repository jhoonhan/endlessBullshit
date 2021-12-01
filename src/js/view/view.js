export default class View {
  _data;

  insertHTML(data, locationHTML) {
    if (!data || !locationHTML) return;

    // this._data = data;
    this._clear(locationHTML);
    const dataHTML = this._generateMarkup(data);
    locationHTML.insertAdjacentHTML('afterbegin', dataHTML);
  }

  controlHidden(selector = this._parentElement, type = 'toggle') {
    if (type === 'add') selector.classList.add('hidden');
    if (type === 'remove') selector.classList.remove('hidden');
    if (type === 'toggle') selector.classList.toggle('hidden');
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
