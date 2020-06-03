import React, { Component } from 'react';
import './style.scss';

import { listRestaurants } from './../../services/restaurants';

import RestaurantList from './../../components/RestaurantList';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  loadRestaurantList() {
    listRestaurants()
      .then(restaurants => {
        this.setState({
          restaurants: restaurants
        });
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadRestaurantList();
  }

  render() {
    return (
      <div>
        <h1>Featured Restaurants</h1>
        <RestaurantList restaurants={this.state.restaurants} />
      </div>
    );
  }
}

export default HomeView;
