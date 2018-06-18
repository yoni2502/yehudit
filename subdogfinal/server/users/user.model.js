const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  photo: String
});
module.exports = mongoose.model('User', schema);