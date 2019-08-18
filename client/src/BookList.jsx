import React from 'react';
import axios from 'axios';

function BookList({books, handleBookDetailsClick, setFavoriteBooks, token}) {
  function addToFavorites(title, apiKey) {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.post('api/books', {title, apiKey}, config).then((res) => {
      axios.get('api/books', config).then((response) => {
        setFavoriteBooks(response.data)
      })
    })
  }

  let content;
  if (books.length) {
    content = books.map((book, index) => {
      return (
        <div key={index}>
          <h4 onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h4>
          {book.authors && book.authors.map((author, i) => (
            <p key={i}>{author.name}</p>
          ))}
          <button className='fave' onClick={() => addToFavorites(book.title, book.cover_edition_key)}>ADD TO MY LIST</button>
      </div>
      )
    })
  } else {
    content = <h1>No Books Found!</h1>
  }

  return (
    <div className="App">
      {/* <h3>ALL BOOKS</h3> */}
      {content}
    </div>
  );
}

export default BookList;