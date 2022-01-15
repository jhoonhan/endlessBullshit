const Artwork = require('../models/artworkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');

// exports.setTourUserIds = (req, res, next) => {
//   // Allows nested routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.createOne = factory.createOne(Artwork);
exports.getOne = factory.getOne(Artwork);
exports.getAll = factory.getAll(Artwork);
