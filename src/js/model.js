import html2canvas from 'html2canvas';
export const artworks = [];

export const state = {
  id: '',
  user: {
    name: '',
    statement: '',
    userIMG: '',
    userResizeIMG: '',
  },
  curImg: '',
};

// a2) load artwork and save it to state
export const loadArtwork = async function (renderImage) {
  try {
    const img = await html2canvas(renderImage);
    state.user.userIMG = img;
  } catch (err) {
    console.error(`${err} - admin`);
  }
};

//////////////////////
