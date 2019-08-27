import React from 'react';
import axios from 'axios';

function BookList({books, handleBookDetailsClick, setFavoriteBooks, displaySuggestedBooks, displayMoreBooksFromAuthor, token, addToFavorites}) {

  let content;

  if (books.length) {
    content = books.map((book, index) => {
      return (
        <div key={index} className='bookinfo' onClick={() => displaySuggestedBooks(book.title)
                                                            }>
          <h5 className='booktitle' onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h5>
          {/* {book.authors && book.authors.map((author, i) => (
              <p className='bookauthors' key={i}>{author.name}</p>
          ))} 
          onClick={() => {displaySuggestedBooks(book.title)
                                                            displayMoreBooksFromAuthor(book.authors[0].name)}}
          */}
          <p className='bookauthors'>{book.authors[0].name}</p>
          <div className='buttons'>
            <button className='submit' className='favebutton' onClick={() => addToFavorites(book.title, book.cover_edition_key)}>ADD TO MY LIST</button>
            <br />
            <button className='submit' className='seemorebutton' onClick={() => displayMoreBooksFromAuthor(book.authors[0].name)}>SEE MORE FROM THIS AUTHOR</button>
          </div>
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