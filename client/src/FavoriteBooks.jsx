import React from 'react';
import axios from 'axios';

function FavoriteBooks({favoriteBooks, handleBookDetailsClick, user, token, setFavoriteBooks}) {

    let content;
    content = favoriteBooks.books ? favoriteBooks.books : {};

    function deleteBook(id) {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.delete(`/api/books/${id}`, config).then(function() {
            axios.get('/api/books').then(response => {
            setFavoriteBooks(response.data)
            })
        })
    }

    if (content.length) {
    content = content.map((book, index) => {
        return (
        <div key={index}>
            <h4 onClick={() => handleBookDetailsClick(book.apiKey)}>{book.title}</h4>
            <h5>Comments: {book.comment}</h5>
            <button className='fave' onClick={() => deleteBook(book._id)}>DELETE</button>
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