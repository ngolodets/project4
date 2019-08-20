import React from 'react';
import axios from 'axios';

function BookListByGenre({books, handleBookDetailsClick, displaySuggestedBooks, token, displayMoreBooksFromAuthor, setFavoriteBooks}) {

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
        <div key={index} onClick={() => displaySuggestedBooks(book.title)}>
          <h4 onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h4>
          {book.authors && book.authors.map((author, i) => (
            <p key={i}>{author.name}</p>
          ))}
          <button className='fave' onClick={() => addToFavorites(book.title, book.cover_edition_key)}>ADD TO MY LIST</button>
          <button onClick={() => displayMoreBooksFromAuthor(book.authors[0].name)}>SEE MORE FROM THIS AUTHOR</button>
      </div>
      )
    })
  } else {
    content = <h1>No Books Found!</h1>
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default BookListByGenre;
