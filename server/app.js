'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');

const restaurantApiRouter = require('./routes/restaurant');
const orderApiRouter = require('./routes/order');
const authenticationApiRouter = require('./routes/authentication');

const app = express();

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));

app.use(express.static(join(__dirname, '../client/build')));

app.use(express.json());

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 1000,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);

app.use('/api/restaurant', restaurantApiRouter);
app.use('/api/order', orderApiRouter);
app.use('/api/authentication', authenticationApiRouter);

app.get('*', (req, res, next) => {
  res.sendFile(join(__dirname, '../client/build/index.html'));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
