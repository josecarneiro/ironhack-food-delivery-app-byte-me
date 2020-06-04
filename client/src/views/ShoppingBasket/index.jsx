import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import DishItem from './../../components/DishItem';
import ShoppingBasketTotal from './../../components/ShoppingBasketTotal';

class ShoppingBasketView extends Component {
  render() {
    return (
      <div>
        <h1>Shopping Basket</h1>
        {this.props.shoppingBasket.map(item => (
          <DishItem
            {...item.dish}
            quantity={item.quantity}
            changeQuantity={quantity => this.props.changeDishQuantity(item.dish, quantity)}
          />
        ))}
        <ShoppingBasketTotal shoppingBasket={this.props.shoppingBasket} />
        <Link to="/shopping-basket/checkout">Proceed to Checkout</Link>
      </div>
    );
  }
}

export default ShoppingBasketView;
