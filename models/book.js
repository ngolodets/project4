const mongoose = require('mongoose');

const bookScema = new mongoose.Schema({
  title: String,
  author: String,
  apiKey: String
})

module.exports = mongoose.model('Book', bookScema);