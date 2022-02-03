import * as config from '../config.js';

export default class View {
  _data;

  insertHTML(data, locationHTML) {
    if (!data || !locationHTML) return;

    // this._data = data;
    this._clear(locationHTML);
    const dataHTML = this._generateMarkup(data);
    locationHTML.insertAdjacentHTML('afterbegin', dataHTML);
  }

  update(data) {
    const newMarkup = this._generateMarkup(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  controlHidden(selector = this._parentElement, type = 'toggle') {
    if (type === 'add') selector.classList.add('hidden');
    if (type === 'remove') selector.classList.remove('hidden');
    if (type === 'toggle') selector.classList.toggle('hidden');
  }

  _clear(locationHTML) {
    locationHTML.innerHTML = '';
  }

  capitalizeName(name) {
    return name
      .split(' ')
      .map(letter => `${letter.slice(0, 1).toUpperCase()}${letter.slice(1)}`)
      .join(' ');
  }

  convertName(name) {
    if (name.length > config.NAMESHORTEN) {
      if (name.split(' ').length > 1) {
        const firstInitial = name.split(' ')[0].slice(0, 1);
        const lastName = name.split(' ').slice(-1)[0];
        return `${firstInitial}. ${lastName}`;
      }
      if (name.split(' ').length <= 1) {
        return name.slice(0, 15);
      }
    } else return name;
  }
}
