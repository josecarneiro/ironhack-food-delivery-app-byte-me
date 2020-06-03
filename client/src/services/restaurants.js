import axios from 'axios';

const baseRestaurantService = axios.create({
  baseURL: '/api/restaurant'
});

const listRestaurants = () => {
  // return new Promise((resolve, reject) => {
  //   axios
  //     .get('/api/restaurant/list')
  //     .then(response => {
  //       const data = response.data;
  //       const restaurants = data.restaurants;
  //       resolve(restaurants);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
  return baseRestaurantService
    .get('/list')
    .then(response => {
      const data = response.data;
      const restaurants = data.restaurants;
      return Promise.resolve(restaurants);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const loadRestaurant = id => {
  return baseRestaurantService
    .get(`/${id}`)
    .then(response => {
      const data = response.data;

      const restaurant = data.restaurant;
      const dishes = data.dishes;

      return Promise.resolve({ ...restaurant, dishes });
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export { listRestaurants, loadRestaurant };
