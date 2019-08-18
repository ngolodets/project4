import React from 'react';

function BookListByGenre({books, handleBookDetailsClick, displaySuggestedBooks, token}) {

  let content;
  if (books.length) {
    content = books.map((book, index) => {
      return (
        <div key={index} onClick={() => displaySuggestedBooks(book.title)}>
        {/* <img className='drinkImg' src={drink.picture} style={{display: "block"}} /> */}
        {/* <br /> */}
        {/* <span className='caption' style={{display: "block"}}>  */}
          {/* <Link to={`/${drink._id}`} 
                style={{textDecoration: 'none',
                        color: 'black'}}> */}
            <h4 onClick={() => handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h4>
            {book.authors && book.authors.map((author, i) => (
              <p key={i}>{author.name}</p>
            ))}

          {/* </Link> */}
        {/* </span> */}
        {/* <Favorite  drink={drink} token={this.token} refreshUser={this.refreshUser} /> */}
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

export default BookListByGenre;
