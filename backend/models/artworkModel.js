const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An artwork must have a name'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Must have a title'],
    default: 'This Is Bullshit',
    trim: true,
  },
  statement: {
    type: String,
    required: [true, 'An artwork must have a statement'],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  img: String,
  imgURL: String,
});
const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
