const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  photo: { type: String },
  course: { type: String }, // ['entry', 'main', 'dessert', 'drink']
  price: {
    amount: { type: Number },
    currency: {
      type: String
    }
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
});

const Model = mongoose.model('Dish', schema);

module.exports = Model;
