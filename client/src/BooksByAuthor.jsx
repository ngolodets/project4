import React from 'react';

function BooksByAuthor({books, handleBookDetailsClick, token, setFavoriteBooks, addToFavorites}) {
  
  let content;
  content = books ? books : [];

  if (content.length) {
    content = content.map((book, index) => {
      return(
        <div className='bottomdetails' key={index}>
          <button className='submit' 
                  onClick={() => addToFavorites(book.title, book.cover_edition_key)} 
                  style={{backgroundColor: 'rgba(69, 112, 110, 0.4)', 
                          border: '1px solid white'}}>ADD TO MY LIST
          </button>
          {/* <h4>{book.title_suggest}</h4> */}
          <p className='names' style={{fontWeight: 'bolder', wordBreak: 'break-all', whiteSpace: 'normal'}} onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title_suggest}</p>
          <p>{book.author_name}</p>
          {/* {book.authors && book.authors.map((author, i) => (
            <p key={i}>{author.name}</p>
          ))} */}
      </div>
      )
    })
  } else {
    content = <h1>Start Browsing to Get Suggestions!</h1>
  }

  return (
    <div className="App">
      {content}
    </div>
    )
  }

export default BooksByAuthor;