const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

router.get('/', (req, res) => {
  res.json({type: 'success', message: "You accessed the protected api routes"})
})

// //GET /artists/:arid/albums -- get albums for one artist
// app.get('/artists/:id/albums', (req, res) => {
//   Artist.findById(req.params.id).populate('albums').exec((err, queen) => {
//     if (err) res.json(err)
//     res.json(queen)
//   }) 
// })

// GET /api/books -- display/get all bookss
// router.get('/books', (req, res) => {
//   Books.find({}, (err, books) => {
//     if (err) res.json(err)
//     res.json(books)
//   })
// })

// GET /api/books -- get all books for the user
router.get('/books', (req, res) => {
  User.findById(req.user._id).populate('books').exec((err, user) => {
    if (err) res.json(err)
    res.json(user)
    //res.json(book)
  })
})

//GET /api/books/:bkid
router.get('/books/:bkid', (req, res) => {
  Book.findById(req.params.bkid, (err, book) => {
    if (err) res.json(err)
    res.json(book)
  })
})

//POST /api/books -- add a book to favorites list
router.post('/books', (req, res) =>{
  User.findById(req.user._id, function(err, user) {
    //Book.findById({
    Book.create({
      title: req.body.title,
      apiKey: req.body.apiKey
    }, 
      function(err,book){
          user.books.push(book)
          user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
      })
    })
  })
})

//PUT /api/books/:bookid -- update one book for one user 
router.put('/books/:bookid', (req, res) => {
  User.findById(
    req.user._id,
    (err, user) => {
      Book.findByIdAndUpdate (
        req.params.bookid,
        (err, book) => {
          if (err) res.json(err)
          res.json(book)
        }
      )
    }
  )
})

//DELETE /api/books/:bookid -- detete one book from user's favorites 
// router.delete('/books/:bookid', (req, res) => {
//   User.findById(req.user._id, (err, user) => {
//     user.books.pull(req.params.bookid)
//     user.save(err => {
//       if (err) res.json(err)
//         res.json(user)
//       })
//     })
//   })

router.delete('/books/:bookid', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    user.books.pull(req.params.bookid)
    user.save(err => {
      if (err) res.json(err)
      User.deleteOne({_id: req.params.bookid}, err => {
        if (err) res.json(err)
        res.json(1)
      })
    })
  })
})

module.exports = router;