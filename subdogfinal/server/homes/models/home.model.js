const mongoose = require('mongoose');
const Animal = require('./animal.model').schema;

const schema = new mongoose.Schema({
  address: {
    street: String,
    city: String
  },
  imageUrls: [String],
  checkInDate: Date,
  checkOutDate: Date,
  description: String,
  animals: [Animal],
  user: String,
});
module.exports = mongoose.model('Home', schema);
