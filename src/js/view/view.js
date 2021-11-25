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

  artworkRender(image) {
    // a4) render sequence fired
    this._image = image;
    this._canvas.width = 1000;
    this._canvas.height = 1000;
    this._canvas.style.opacity = 0.5;
    const renderData = this._canvas.getContext('2d');
    renderData.drawImage(image, 0, 0, 1001, 1001);
  }

  getUrl() {
    const dataURL = this._canvas.toDataURL();
    console.log(dataURL);
  }
}
