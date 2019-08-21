import React from 'react';

function SuggestedBooks({suggestedBooks, handleBookDetailsClick, token, setFavoriteBooks, addToFavorites}) {
  
  let content;
  content = suggestedBooks ? suggestedBooks : [];

  if (content.length) {
    content = content.map((book, index) => {
      return(
        <div className='bottomdetails' key={index}>
          {/* <h4>{book.title_suggest}</h4> */}
          <button className='submit' 
                  onClick={() => addToFavorites(book.title_suggest, book.cover_edition_key)} 
                  style={{backgroundColor: 'rgba(69, 112, 110, 0.4)', 
                          border: '1px solid white'}}>ADD TO MY LIST
          </button>
          <p className='names' 
              style={{fontWeight: 'bolder', 
                      wordBreak: 'break-all', 
                      whiteSpace: 'normal'}} 
              onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title_suggest}</p>
          <p className='names'>{book.author_name}</p>
          {/* {book.authors && book.authors.map((author, i) => (
            <p key={i}>{author.name}</p>
          ))} */}
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
    )
  }


export default SuggestedBooks;