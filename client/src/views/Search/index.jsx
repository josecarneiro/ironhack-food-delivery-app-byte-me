import React, { Component } from 'react';
import queryString from 'query-string';

import RestaurantList from './../../components/RestaurantList';

import { searchForRestaurant } from './../../services/restaurants';

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  triggerSearch() {
    const { term } = queryString.parse(this.props.location.search);
    searchForRestaurant(term)
      .then(restaurants => {
        this.setState({
          restaurants
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.triggerSearch();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.location.search !== this.props.location.search) {
      // Search term has changed, search should be triggered
      this.triggerSearch();
    }
  }

  render() {
    const restaurants = this.state.restaurants;
    return (
      <div>
        <h1>Search results...</h1>
        <RestaurantList restaurants={restaurants} />
      </div>
    );
  }
}

export default SearchView;
