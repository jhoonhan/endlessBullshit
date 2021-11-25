export default class View {
  _image;

  _artworkResize() {
    // a5) adjust render size and returns data
    // this._canvas.width = 1000;
    // this._canvas.height = 1000;
    // this._canvas.style.opacity = 0.5;
    // const renderedData = this._canvas.getContext('2d');
    return renderedData;
  }

  artworkRender(image, run, canvas = this._canvas) {
    // a4) render sequence fired
    this._image = image;
    canvas.width = 1000;
    canvas.height = 1000;
    if (run === 'first') canvas.style.opacity = 0.5;
    const renderData = canvas.getContext('2d');
    renderData.drawImage(image, 0, 0, 1000, 1000);
  }

  artworkLatest(imgURL) {
    // change background style of...
    this._artwork.style.backgroundImage = `url(${imgURL})`;
  }
}
