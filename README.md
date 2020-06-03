# Plan the app

## Views

### Home

Display list of restaurants.

### Restaurant

Look into a specific restaurant. See restaurant information. See list of plates served by restaurant. Click on "add to cart" on any given plate.

### Shopping Basket

Seeing the list of things we're going to order.

### Checkout view

Forms with address input and credit card input, purchase confirmation.

### Past orders view

Load all past orders for signed in user and display them.

### Authentication - Sign In

### Authentication - Sign Up

### Authentication - Profile

### Search view

User is able to search for restaurant OR plate.

## Models

### Restaurant

Save the information about restaurant.

- name
- address
- category: ['asian', 'italian', 'brunch']
- price: Number between 1 and 3
- phone: String
- waitTime: Number
- rating: Number between 1 and 5
- photo: String, URL

### Dish

Save information about each dish.

- name
- photo
- course: String ['entry', 'main', 'dessert', 'drink']
- price: Object, {
  amount: Number, 965
  currency: String ["EUR", "USD", "GBP", "KOR", "AUD", "JPY"]
  }
- restaurant: ObjectId with ref to Restaurant model, can be populated

### Order

- dishes: Array of Objects: {
  dish: ObjectIds with ref: 'Plate',
  quantity: Number 1 - Infinity
  }
- total: {
  amount: Number (integer),
  currency: String ['EUR', 'USD']
  }
- address: String
- payment: String, Stripe's payment id
- dateCreated: Date
- dateUpdated: Date
- user: ObjectId with ref: 'User'

### User

- name
- email
- passwordHashAndSalt
- address
- photo

## REST API

Every endpoint is going to start with "/api"

- GET - "/restaurant/list" - List all restaurants
- GET - "/restaurant/:id" - Load single restaurant. Send list of dishes with that restaurant's id.

- GET - "/order/list" - List all orders created by user
- POST - "/order" - Create a new order
  Body:

  ```
  {
  dishes: [
    {
      dish: Id of the dish,
      quantity: Number
    }
  ],
  address: String,
  creditCardToken: String
  }
  ```

- POST - "/authentication/sign-in" - Signs in user
- POST - "/authentication/sign-up" - Signs up user
- POST - "/authentication/sign-out" - Signs out user

- GET - "/authentication/me" - Load information about signed in user
