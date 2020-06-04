const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    basket: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Dish'
        },
        quantity: {
          type: Number
        }
      }
    ],
    total: {
      amount: { type: Number },
      currency: {
        type: String
      }
    },
    address: { type: String },
    payment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated'
    }
  }
);

const Model = mongoose.model('Order', schema);

module.exports = Model;
