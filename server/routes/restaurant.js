'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('../middleware/route-guard');

const Restaurant = require('./../models/restaurant');
const Dish = require('./../models/dish');

router.get('/list', (req, res, next) => {
  Restaurant.find()
    .then(restaurants => {
      res.json({
        restaurants: restaurants
      });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  let restaurant;

  Restaurant.findById(id)
    .then(document => {
      restaurant = document;
      return Dish.find({ restaurant: id });
    })
    .then(dishes => {
      res.json({
        restaurant: restaurant,
        dishes: dishes
      });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
