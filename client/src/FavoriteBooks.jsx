import React, {useState} from 'react';
import axios from 'axios';

function FavoriteBooks({favoriteBooks, handleBookDetailsClick, user, token, setFavoriteBooks, displaySuggestedBooks, showFavoriteBooks, displayMoreBooksFromAuthor}) {
    const [comment, setComment] = useState('');

    let content;
    content = favoriteBooks.books ? favoriteBooks.books : {};

    function deleteBook(id) {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.delete(`/api/books/${id}`, config) 
        //{headers: {
            //Authorization: `Bearer ${token}`}})
                .then(function() {
                    axios.get('/api/books')
                    //{headers: {
                        //Authorization: `Bearer ${token}`}})
                            .then(response => {
                                setFavoriteBooks(response.data)
            })
        })
        showFavoriteBooks()
    }

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
        <div key={index} className='favebookinfo'>
            <div className='favebooktitle'>
                <h4 className='favebooktitle' 
                    onClick={() => {handleBookDetailsClick(book.apiKey)
                                    displaySuggestedBooks(book.title)} }>
                    {book.title}
                </h4>
            </div>
            <div className='favebooktitle' 
                    style={{width: '80%', 
                            height: 'fit-content', 
                            margin: '0 auto', 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            marginTop: '1px', 
                            marginBottom: '1px'}}>
                <h5 className='comments'>
                    <span style={{fontFamily: "'Stardos Stencil', cursive"}}>COMMENTS:</span> 
                    {book.comment}
                </h5>
            </div>
            <form className='commentform' 
                    onSubmit={(e) => handleCommentSubmit(e, book._id, comment)} >
                <input id='commentbox' 
                        type="text" 
                        name="comment" 
                        placeholder="Please enter your comments..." 
                        onChange={(e) => setComment(e.target.value)}
                        style={{fontFamily: "'Stardos Stencil', cursive",
                                color: 'rgb(69, 112, 110)',
                                textAlign: 'center'}} />
                <input type="submit" 
                        className='submit' 
                        id='commentbutton'/>
            </form>
            <button className='submit' 
                    id='deletebutton' 
                    onClick={() => deleteBook(book._id)}>Delete Book
            </button>
        </div>
        )
    })
    } else {
    content = <h1>You Don't Have Any Books Yet!</h1>
    }

    return (
    <div className="App">
        {content}
    </div>
    );
}

export default FavoriteBooks;