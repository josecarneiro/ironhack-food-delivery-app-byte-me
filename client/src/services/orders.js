import axios from 'axios';

const baseOrderService = axios.create({
  baseURL: '/api/order'
});

const createOrder = data => {
  return baseOrderService
    .post('/', data)
    .then(response => {
      // ...
      const responseBody = response.data;
      console.log(responseBody);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const listOrders = () => {
  return baseOrderService
    .get('/list')
    .then(response => {
      // ...
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export { createOrder, listOrders };
