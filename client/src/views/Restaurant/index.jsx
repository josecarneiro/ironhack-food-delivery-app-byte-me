import React, { Component } from 'react';
import './style.scss';

import DishItem from './../../components/DishItem';

import { loadRestaurant } from './../../services/restaurants';

class RestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      restaurant: null
    };
  }

  loadSingleRestaurant() {
    const id = this.props.match.params.id;
    loadRestaurant(id)
      .then(restaurant => {
        this.setState({
          loaded: true,
          restaurant
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadSingleRestaurant();
  }

  render() {
    const restaurant = this.state.restaurant;
    return (
      <div>
        {!this.state.loaded && (
          <>
            <span>Loading...</span>
          </>
        )}
        {restaurant && (
          <>
            <img src={restaurant.photo} alt={restaurant.name} />
            <h1>{restaurant.name}</h1>
            <small>
              {restaurant.phone} | {restaurant.address}
            </small>
            <div>
              {restaurant.dishes.map(dish => {
                const dishInShoppingBasket = this.props.shoppingBasket.find(
                  item => item.dish._id === dish._id
                );
                let quantity = 0;
                if (dishInShoppingBasket) {
                  quantity = dishInShoppingBasket.quantity;
                }
                return (
                  <DishItem
                    {...dish}
                    key={dish._id}
                    quantity={quantity}
                    changeQuantity={quantity => this.props.changeDishQuantity(dish, quantity)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default RestaurantView;
