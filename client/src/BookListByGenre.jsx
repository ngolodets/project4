import React from 'react';
import axios from 'axios';

function BookListByGenre({books, handleBookDetailsClick, displaySuggestedBooks, token, displayMoreBooksFromAuthor, setFavoriteBooks, addToFavorites}) {

  // function addToFavorites(title, apiKey) {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   axios.post('api/books', {title, apiKey}, config).then((res) => {
  //     axios.get('api/books', config).then((response) => {
  //       setFavoriteBooks(response.data)
  //     })
  //   })
  // }

  let content;
  if (books.length) {
    content = books.map((book, index) => {
      return (
        <div key={index} className='bookinfo' onClick={() => {displaySuggestedBooks(book.title)
                                        displayMoreBooksFromAuthor(book.authors[0].name)}}>
          <h5 className='booktitle' onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h5>
          {/* className='submit' {book.authors && book.authors.map((author, i) => (
            <p key={i} className='bookauthors' >{author.name}</p>
          ))} */}
          <p className='bookauthors'>{book.authors[0].name}</p>
          <div className='buttons'>
            <button className='favebutton' onClick={() => addToFavorites(book.title, book.cover_edition_key)}>ADD TO MY LIST</button>
            < br/>
            <button className='seemorebutton' onClick={() => displayMoreBooksFromAuthor(book.authors[0].name)}>SEE MORE FROM THIS AUTHOR</button>
          </div>
      </div>
      )
    })
  } else {
    content = <h1></h1>
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default BookListByGenre;
