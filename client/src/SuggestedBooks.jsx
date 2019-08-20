import React from 'react';
import axios from 'axios';

function SuggestedBooks({suggestedBooks, handleBookDetailsClick, token, setFavoriteBooks, addToFavorites}) {
  let content;
  content = suggestedBooks ? suggestedBooks : [];

  if (content.length) {
    content = content.map((book, index) => {
      return(
        <div key={index}>
          {/* <h4>{book.title_suggest}</h4> */}
          <h4 onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title_suggest}</h4>
          <p>{book.author_name}</p>
          {/* {book.authors && book.authors.map((author, i) => (
            <p key={i}>{author.name}</p>
          ))} */}
          <button className='submit' onClick={() => addToFavorites(book.title_suggest, book.cover_edition_key)}>ADD TO MY LIST</button>
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
    )
  }


export default SuggestedBooks;