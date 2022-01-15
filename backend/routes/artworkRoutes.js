const express = require('express');
const artworkController = require('../controllers/artworkController');
const catchAsync = require('../utils/catchAsync');
const Artwork = require('../models/artworkModel');

const router = express.Router();

router
  .route('/')
  .get(artworkController.getAll)
  .post(artworkController.createOne);

router.route('/:id').get(artworkController.getOne);

module.exports = router;
