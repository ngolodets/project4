import React from 'react';
//import BookDetails from './BookDetails';
//import axios from 'axios';

const BookListByGenre = props => {
  return (
    <div>
      {/* <h3>ALL BOOKS</h3> */}
      {props.books && props.books.map(book => (
        // <div className="drinklist" onClick={() => this.props.handleDetailsClick(drink._id)}>
        <div>
          {/* <img className='drinkImg' src={drink.picture} style={{display: "block"}} /> */}
          {/* <br /> */}
          {/* <span className='caption' style={{display: "block"}}>  */}
            {/* <Link to={`/${drink._id}`} 
                  style={{textDecoration: 'none',
                          color: 'black'}}> */}
              <h4 onClick={() => props.handleBookDetailsClick(book.cover_edition_key)}>{book.title}</h4>
              {book.authors && book.authors.map(author => (
                <p>{author.name}</p>
              ))}

            {/* </Link> */}
          {/* </span> */}
          {/* <Favorite  drink={drink} token={this.props.token} refreshUser={this.props.refreshUser} /> */}
        </div>
      ))}
    </div>
  )
}

export default BookListByGenre;
