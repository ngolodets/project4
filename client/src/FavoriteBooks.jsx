import React from 'react';

function FavoriteBooks({favoriteBooks, handleBookDetailsClick, user, token}) {

    let content;
    content = favoriteBooks.books ? favoriteBooks.books : {};
    //content = user.books ? user.books : [];
    if (content.length) {
    content = content.map((book, index) => {
        return (
        <div key={index}>
            <h4 onClick={() => handleBookDetailsClick(book.apiKey)}>{book.title}</h4>
            {/* {book.authors && book.authors.map((author, i) => (
                <p key={i}>{author.name}</p>
            ))} */}
            <h5>Comments: {book.comment}</h5>
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

export default FavoriteBooks;