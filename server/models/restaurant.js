const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String }, //
  address: { type: String }, //
  category: { type: String }, //: ['asian', 'italian', 'brunch']
  price: { type: String, min: 1, max: 3 }, //: Number between 1 and 3
  phone: { type: String }, //: String
  waitTime: { type: Number }, //: Number
  rating: { type: Number, min: 1, max: 5 }, //: Number between 1 and 5
  photo: { type: String } //: String, URL
});

const Model = mongoose.model('Restaurant', schema);

module.exports = Model;
