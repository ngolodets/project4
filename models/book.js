const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  apiKey: String,
  comment: String //,
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User'
  // }
})

module.exports = mongoose.model('Book', bookSchema);