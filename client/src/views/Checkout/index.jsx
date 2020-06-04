import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import { createOrder } from './../../services/orders';

import './style.scss';

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_API_PUBLIC_KEY;

const STRIPE_INPUT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'sans-serif'
    },
    invalid: {
      color: '#c23d4b'
    }
  }
};

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
    this.stripePromise = loadStripe(STRIPE_PUBLIC_API_KEY);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = (event, stripe, elements) => {
    event.preventDefault();

    stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })
      .then(data => {
        if (data.error) {
          return Promise.reject(data.error);
        } else {
          const address = this.state.address;
          const creditCardToken = data.paymentMethod.id;
          // Call create order service and send creditCardToken, array of dishes with corresponding quantity, address
          const shoppingBasket = this.props.shoppingBasket.map(item => {
            return {
              quantity: item.quantity,
              dish: item.dish._id
            };
          });
          // const shoppingBasket = this.props.shoppingBasket.map(item => ({ ...item, dish: item.dish._id }));
          return createOrder({ address, shoppingBasket, creditCardToken });
        }
      })
      .then(() => {
        // Order succeeded
        this.props.emptyShoppingBasket();
        // Redirect user to home page after successful purchase
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={event => this.handleFormSubmission(event, stripe, elements)}>
                <label htmlFor="address-input">Delivery Address</label>
                <input
                  id="address-input"
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />

                <CardElement option={STRIPE_INPUT_OPTIONS} />

                <button>Confirm Purchase</button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default CheckoutView;
