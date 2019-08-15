import React from 'react';
import axios from 'axios';

const BookList = (props) => {
  // let authors = props.books.authors;
  // if (props.books.length) {
  //   authors.map(author => {
  //     return (
  //       <div>
  //         <p>{author.name}</p>
  //       </div>
  //     )
  //   })
  // }
  return (
    <div className="App">
      <h3>ALL BOOKS</h3>
      {props.books && props.books.map(book => (
        // <div className="drinklist" onClick={() => this.props.handleDetailsClick(drink._id)}>
        <div>
          {/* <img className='drinkImg' src={drink.picture} style={{display: "block"}} /> */}
          {/* <br /> */}
          {/* <span className='caption' style={{display: "block"}}>  */}
            {/* <Link to={`/${drink._id}`} 
                  style={{textDecoration: 'none',
                          color: 'black'}}> */}
              <h4>{book.title}</h4>
              {book.authors && book.authors.map(author => (
                <p>{author.name}</p>
              ))}

            {/* </Link> */}
          {/* </span> */}
          {/* <Favorite  drink={drink} token={this.props.token} refreshUser={this.props.refreshUser} /> */}
        </div>
      ))}
    </div>
  );
}

export default BookList;