import * as config from '../config.js';
import View from './View.js';

class LatestArtwork extends View {
  _generateMarkup(data) {
    const [name, date] = data;
    const year = '2222000011';
    return `
          <span>
            <i>This is Bullshit</i>, ${name}, ${year}
          </span>
        `;
  }
}

export default new LatestArtwork();
