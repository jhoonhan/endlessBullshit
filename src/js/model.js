import html2canvas from 'html2canvas';
export const artworks = [];

export const log = {
  id: '',
  data: {
    name: '',
    statement: '',
    img: '',
  },
  index: '',
};

// export const latestArtwork = async function () {};

// a2) load artwork and save it to state
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    logArtwork(img);
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

const logArtwork = function (img) {
  log.data.img = img;
  log.id = 'aaang';
  log.data.name = 'aaang!!';
  artworks.push(log);
  console.log(artworks);
};

//////////////////////
