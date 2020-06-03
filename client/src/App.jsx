import React from 'react';
import './App.css';

import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import HomeView from './views/Home';
import RestaurantView from './views/Restaurant';
import ShoppingBasketView from './views/ShoppingBasket';
import CheckoutView from './views/Checkout';
import PastOrdersView from './views/PastOrders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/restaurant/:id" component={RestaurantView} />
          <Route path="/shopping-basket/checkout" component={CheckoutView} />
          <Route path="/shopping-basket" component={ShoppingBasketView} />
          <Route path="/past-orders" component={PastOrdersView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
