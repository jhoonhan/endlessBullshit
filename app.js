const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
// const path = require('path');

// const path = require('path');

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again later',
});

app.use('/api', limiter);

// Body parser, reading data from body inro req.body
app.use(express.json());
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['name', 'id', 'index'],
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/artworks', artworkRouter);

// app.route('/api/v1/artworks').get(getAllArtworks).post(getAllArtworks);

module.exports = app;
