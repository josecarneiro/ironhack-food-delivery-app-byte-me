import React, { Component } from 'react';
import './style.scss';

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
            <ul>
              {restaurant.dishes.map(dish => (
                <li>{dish.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default RestaurantView;
