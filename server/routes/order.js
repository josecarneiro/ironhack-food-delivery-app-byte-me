'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('../middleware/route-guard');

const orders = [
  {
    dishes: [
      { dish: { name: 'Rice' }, quantity: 2 },
      { dish: { name: 'Rice' }, quantity: 2 }
    ],
    total: {
      amount: 2000,
      currency: 'EUR'
    },
    dateCreated: new Date(),
    address: 'Heden Santa Apolónia'
  }
];

router.get('/list', (req, res, next) => {
  res.json({
    orders: orders
  });
});

router.post('/', (req, res, next) => {
  const { dishes, address, creditCardToken } = req.body;
  console.log(req.body);
  res.json({
    order: orders[0]
  });
});

module.exports = router;
