import React, {useState} from 'react';
import axios from 'axios';

function FavoriteBooks({favoriteBooks, handleBookDetailsClick, user, token, setFavoriteBooks, displaySuggestedBooks}) {
    const [comment, setComment] = useState('');

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

    // function updateComment(id) {
    //     let config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }
    //     axios.put(`/api/books/${id}`, config).then(function() {
    //         axios.get('/api/books').then(response => {
    //         setFavoriteBooks(response.data)
    //         })
    //     })
    // }

    function handleCommentChange(e) {
        e.preventDefault();
        setComment(e.target.value);
    }

    function handleCommentSubmit(e, id, comment) {
        console.log('comment:', comment)
        e.preventDefault();
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.put(`/api/books/${id}`, {comment: comment}, config).then(function() {
            axios.get('/api/books').then(response => {
                setFavoriteBooks(response.data)
            })
        })
    }

    if (content.length) {
    content = content.map((book, index) => {
        return (
        <div key={index} onClick={() => displaySuggestedBooks(book.title)}>
            <h4 onClick={() => handleBookDetailsClick(book.apiKey)}>{book.title}</h4>
            <h5>Comments: {book.comment}</h5>
            {/* <form onSubmit={() => handleCommentSubmit(book.comment)}> */}
            {/* <form onSubmit={() => handleCommentSubmit(book._id)} >
                <input type="text" 
                    name="comment" 
                    placeholder="Please enter your comments" 
                    onChange={handleCommentChange}
                    value={comment} />
                <input type="submit"/>
            </form> */}
            {/* <button onClick={() => updateComment(book._id)}>UPDATE</button> */}
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