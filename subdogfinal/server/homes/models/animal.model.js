const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
  description: String,
});
module.exports.schema = schema;
module.exports.model = mongoose.model('Animal', schema);