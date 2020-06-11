import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import HomeView from './views/Home';
import RestaurantView from './views/Restaurant';
import ShoppingBasketView from './views/ShoppingBasket';
import CheckoutView from './views/Checkout';
import PastOrdersView from './views/PastOrders';
import SearchView from './views/Search';

import AuthenticationSignUpView from './views/Authentication/SignUp';
import AuthenticationSignInView from './views/Authentication/SignIn';

import ErrorView from './views/Error';

import { loadAuthenticatedUser } from './services/authentication';

const deepCloneObject = object => JSON.parse(JSON.stringify(object));

class App extends Component {
  constructor() {
    super();
    this.state = {
      shoppingBasket: [],
      user: null,
      loaded: false
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then(user => {
        this.updateUser(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeDishQuantity = (dish, quantity) => {
    if (this.state.shoppingBasket.find(item => item.dish._id === dish._id)) {
      // const updatedShoppingBasket = [...this.state.shoppingBasket];
      // If I did a shallow clone as I had in the line above,
      // when changing the quantity I would be mutating the original shoppingBasket child objects
      const updatedShoppingBasket = deepCloneObject(this.state.shoppingBasket);
      const indexOfDishInShoppingBasket = this.state.shoppingBasket.findIndex(
        item => item.dish._id === dish._id
      );
      if (quantity) {
        updatedShoppingBasket[indexOfDishInShoppingBasket].quantity = Math.max(quantity, 0);
      } else {
        updatedShoppingBasket.splice(indexOfDishInShoppingBasket, 1);
      }
      this.setState({
        shoppingBasket: updatedShoppingBasket
      });
    } else {
      this.setState({
        shoppingBasket: [
          ...this.state.shoppingBasket,
          {
            dish: dish,
            quantity: Math.max(quantity, 0)
          }
        ]
      });
    }
  };

  emptyShoppingBasket = () => {
    this.setState({
      shoppingBasket: []
    });
  };

  updateUser = user => {
    this.setState({
      user
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loaded && (
          <BrowserRouter>
            <NavBar
              shoppingBasket={this.state.shoppingBasket}
              user={this.state.user}
              updateUser={this.updateUser}
            />
            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route
                path="/restaurant/:id"
                render={props => (
                  <RestaurantView
                    {...props}
                    shoppingBasket={this.state.shoppingBasket}
                    changeDishQuantity={this.changeDishQuantity}
                  />
                )}
              />
              <ProtectedRoute
                path="/shopping-basket/checkout"
                authorized={this.state.user}
                redirect={'/sign-up'}
                render={props => (
                  <CheckoutView
                    {...props}
                    shoppingBasket={this.state.shoppingBasket}
                    emptyShoppingBasket={this.emptyShoppingBasket}
                  />
                )}
              />
              <Route
                path="/shopping-basket"
                render={props => (
                  <ShoppingBasketView
                    {...props}
                    shoppingBasket={this.state.shoppingBasket}
                    changeDishQuantity={this.changeDishQuantity}
                  />
                )}
              />
              <Route path="/past-orders" component={PastOrdersView} />
              s
              <Route path="/search" component={SearchView} />
              <Route
                path="/sign-up"
                render={props => (
                  <AuthenticationSignUpView {...props} updateUser={this.updateUser} />
                )}
              />
              <Route
                path="/sign-in"
                render={props => (
                  <AuthenticationSignInView {...props} updateUser={this.updateUser} />
                )}
              />
              <Route path="/error/:code" component={ErrorView} />
              <Redirect to="/error/404" />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
