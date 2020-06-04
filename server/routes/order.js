'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('../middleware/route-guard');

const Dish = require('./../models/dish');
const Order = require('./../models/order');

router.get('/list', (req, res, next) => {
  res.json({
    orders: []
  });
});

// Stripe configuration

const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_API_SECRET_KEY);

router.post('/', routeGuard, (req, res, next) => {
  const { address, creditCardToken, shoppingBasket } = req.body;

  const dishIds = shoppingBasket.map(item => item.dish);

  let customer;
  let total;

  Dish.find({ _id: dishIds })
    .then(dishes => {
      const totalAmount = dishes.reduce((sum, dish) => {
        const quantity = shoppingBasket.find(item => item.dish === dish._id.toString()).quantity;
        return sum + dish.price.amount * quantity;
      }, 0);
      total = {
        amount: totalAmount,
        currency: dishes[0].price.currency
      };

      return stripeInstance.customers.create();
    })
    .then(document => {
      customer = document;
      return stripeInstance.paymentMethods.attach(creditCardToken, {
        customer: customer.id
      });
    })
    .then(method => {
      return stripeInstance.paymentIntents.create({
        customer: customer.id,
        payment_method: creditCardToken,
        amount: total.amount,
        currency: total.currency,
        error_on_requires_action: true,
        confirm: true,
        save_payment_method: true
      });
    })
    .then(payment => {
      if (payment.status !== 'succeeded') {
        return Promise.reject(new Error('Charge could not be made.'));
      } else {
        return Order.create({
          basket: shoppingBasket,
          total: total,
          payment: payment.id,
          address: address
          // user: req.user._id
        });
      }
    })
    .then(order => {
      res.json({ order: order });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
