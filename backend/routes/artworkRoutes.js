const express = require('express');
const artworkController = require('../controllers/artworkController');

const router = express.Router();

router
  .route('/')
  .get(artworkController.getAll)
  .post(artworkController.createOne);

router.route('/:id').get(artworkController.getOne);

module.exports = router;
