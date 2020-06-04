import React from 'react';

import formatPrice from './../helpers/format-price';

const ShoppingBasketTotal = props => {
  const shoppingBasket = props.shoppingBasket;
  const totalAmount = shoppingBasket.reduce(
    (sum, item) => sum + item.dish.price.amount * item.quantity,
    0
  );
  const totalPrice = {
    amount: totalAmount,
    currency: 'EUR'
  };
  return <div>{formatPrice(totalPrice)}</div>;
};

export default ShoppingBasketTotal;
