'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

// Multer configuration

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'byte-me'
});

const uploader = multer({ storage, limit: { fileSize: 10 * 1024 * 1024 } });

router.post('/sign-up', uploader.single('photo'), (req, res, next) => {
  const { name, email, password } = req.body;
  let photo;
  if (req.file) photo = req.file.url;
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash,
        photo
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.json({ user: user });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', (req, res, next) => {
  res.json({
    user: req.user || null
  });
});

module.exports = router;
