const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

router.get('/', (req, res) => {
  res.json({type: 'success', message: "You accessed the protected api routes"})
})

module.exports = router;