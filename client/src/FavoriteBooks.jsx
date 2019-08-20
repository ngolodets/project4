import React, {useState} from 'react';
import axios from 'axios';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom';

function FavoriteBooks({favoriteBooks, handleBookDetailsClick, user, token, setFavoriteBooks, displaySuggestedBooks, showFavoriteBooks, displayMoreBooksFromAuthor}) {
    const [comment, setComment] = useState('');

    let content;
    content = favoriteBooks.books ? favoriteBooks.books : {};

    function deleteBook(id) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        axios.delete(`/api/books/${id}`, {headers: {
            Authorization: `Bearer ${token}`}})
                .then(function() {
                    axios.get('/api/books', {headers: {
                        Authorization: `Bearer ${token}`}})
                            .then(response => {
                                setFavoriteBooks(response.data)
            })
        })
        showFavoriteBooks()
    }

    // function handleCommentChange(e) {
    //     e.preventDefault();
    //     setComment(e.target.value);
    // }

    function handleCommentSubmit(e, id, comment) {
        e.preventDefault();
        console.log('comment:', comment)
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        axios.put(`/api/books/${id}`, {comment}, {headers: {
            Authorization: `Bearer ${token}` }})
                .then(function() {
                    axios.get('/api/books').then(response => {
                        setFavoriteBooks(response.data)
            })
        })
        showFavoriteBooks()
    }

    if (content.length) {
    content = content.map((book, index) => {
        return (
        <div key={index}>
        {/* // <div key={index} onClick={() => displaySuggestedBooks(book.title)}> */}
            <h4 onClick={() => {handleBookDetailsClick(book.apiKey)
                                displaySuggestedBooks(book.title)} }>
                {book.title}
            </h4>
            <h5>Comments: {book.comment}</h5>
            {/* <form onSubmit={() => handleCommentSubmit(book.comment)}>  */}
            <form onSubmit={(e) => handleCommentSubmit(e, book._id, comment)} >
                <input type="text" 
                    name="comment" 
                    placeholder="Please enter your comments" 
                    // onChange={handleCommentChange}
                    onChange={(e) => setComment(e.target.value)}
                    />
                <input type="submit"/>
            </form>
            {/* <button onClick={() => updateComment(book._id)}>UPDATE</button> comment={book.comment} value={comment}*/}
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