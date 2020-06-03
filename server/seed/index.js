// Run this script to import all dishes to database

'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');

const DISH_LIST = require('./dishes');
const RESTAURANT_LIST = require('./restaurants');

const run = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    const restaurants = await Restaurant.create(RESTAURANT_LIST);
    for (const restaurant of restaurants) {
      DISH_LIST.sort(() => 0.5 - Math.random());
      await Dish.create(DISH_LIST.map(dish => ({ ...dish, restaurant: restaurant._id })));
    }
  } catch (error) {
    console.log(error);
    console.error(`There was an error adding data to database.`);
  }
};

run();
