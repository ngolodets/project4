const mongoose = require('mongoose');

const bookScema = new mongoose.Schema({
  title: String,
  apiKey: String,
  comment: String
})

module.exports = mongoose.model('Book', bookSchema);