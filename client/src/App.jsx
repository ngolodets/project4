import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import BookListByGenre from './BookListByGenre';
import BookDetails from './BookDetails';
import FavoriteBooks from './FavoriteBooks';
import SuggestedBooks from './SuggestedBooks';
import BooksByAuthor from './BooksByAuthor';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState({});
  const [genre, setGenre] = useState('');
  const [currentGenre, setCurrentGenre] = useState({});
  const [currentBook, setCurrentBook] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState({});
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      setToken('');
      setUser({});
    } else {
      // Token is found in local storage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setToken('');
            setUser({});
            setErrorMessage(res.data.message);
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            setErrorMessage('');
            displayAllBooks();
            showFavoriteBooks();
            displaySuggestedBooks();
          }
      })
    }
  }, [token])

  function logout() {
    // Remove token from local storage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    setToken('');
    setUser({});
  }

  // displays the list of books on the initial page load
  function displayAllBooks() {
    let url = 'https://openlibrary.org/subjects/classics.json?limit=100'
    axios.get(url).then( result => {
      setApiData(result.data.works)
    }).catch(function (error) {
      console.log(error);
    })
  }

  // displays the list of book suggestions based on the current book title
  function displaySuggestedBooks(bookTitle) {
    //bookTitle = bookTitle.toLowerCase().split(' ').join('+');
    //console.log('booktitle: ', bookTitle)
    axios.get(`https://openlibrary.org/search.json?title=${bookTitle}`)
      .then(result => {
        setSuggestedBooks(result.data.docs)
    })
  }

  // displays the list of book suggestions based on the current author
  function displayMoreBooksFromAuthor(author) {
    axios.get(`https://openlibrary.org/search.json?author=${author}`)
        .then(result => {
          setAuthor(result.data.docs)
    })
  }

  function handleGenreChange(e) {
    e.preventDefault();
    let value = e.target.value.toLowerCase()
    setGenre(value)
  }

  function handleGenreSubmit(e) {
    e.preventDefault()
    axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=100`)
      .then(result => {
        setCurrentGenre(result.data.works)
      })
    setGenre('')
  }

  function handleBookDetailsClick(bookKey) {
    console.log('fetching details for:', bookKey);
    var isbn = 'OLID:' + bookKey;
    console.log("isbn:", isbn)
    const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&jscmd=data&format=json`;
    console.log("url is: ",url);
    axios.get(url).then(result => {
      console.log("Result:", result.data[isbn])
      setCurrentBook(result.data[isbn])
    })
  }

  // displays the list of user's saved books
  function showFavoriteBooks() {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
    axios.get('/api/books', {headers: {Authorization: `Bearer ${token}`}})
      .then(result => {
        setFavoriteBooks(result.data)
    })
  } 

  function addToFavorites(title, apiKey) {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.post('api/books', {title, apiKey}, config).then((res) => {
      axios.get('api/books', config).then((response) => {
        setFavoriteBooks(response.data)
      })
    })
  }

  var contents = ''
  if (Object.keys(user).length > 1) {
    contents = (
      <>
        <h5 className='title'>MY BOOKS APP</h5>
        <div className="header">
          <div id='hello'>
            HELLO, {user.name}!
          </div>
          <div className='searchbox'>
              <form onSubmit={handleGenreSubmit} >
                <input type="text" 
                        name="genre" 
                        placeholder="Please enter the genre..." 
                        onChange={handleGenreChange}
                        value={genre}
                        style={{fontFamily: "'Stardos Stencil', cursive",
                                color: 'rgb(69, 112, 110)',
                                textAlign: 'center'}}/>
                <input type="submit" className='submit' id='searchbutton'/>
              </form>
          </div>
          <div id='goodbye' onClick={logout}>
            LOGOUT
          </div>
        </div>
        <h6 className='browse'>BROWSE BOOKS:</h6>
        <div className='flex-container'>
          <div className='left'>
            <div className='leftlist'>
              <BookListByGenre books={currentGenre} 
                                addToFavorites={addToFavorites} 
                                handleBookDetailsClick={handleBookDetailsClick} 
                                token={token} 
                                setFavoriteBooks={setFavoriteBooks} 
                                displaySuggestedBooks={displaySuggestedBooks} 
                                displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
              <BookList books={apiData} 
                        addToFavorites={addToFavorites} 
                        handleBookDetailsClick={handleBookDetailsClick} 
                        token={token} 
                        setFavoriteBooks={setFavoriteBooks} 
                        displaySuggestedBooks={displaySuggestedBooks} 
                        displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
          </div>
          <div className='right'>
            <div className='rightdetail'>
              <BookDetails  bookDetails={currentBook} 
                            token={token} 
                            setFavoriteBooks={setFavoriteBooks} 
                            displaySuggestedBooks={displaySuggestedBooks} 
                            displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
            <h5 className='browse' style={{width: '43.5vw'}}>MY READS:</h5>
            <div className='rightfave'>
              <FavoriteBooks favoriteBooks={favoriteBooks} 
                              handleBookDetailsClick={handleBookDetailsClick} 
                              displaySuggestedBooks={displaySuggestedBooks} 
                              user={user} 
                              token={token} 
                              showFavoriteBooks={showFavoriteBooks} 
                              displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
          </div>
        </div>
        <p className='browse' style={{marginBottom: '0px', backgroundColor: 'rgba(59, 117, 115, 0.6)', width: '100vw', borderTop: '1px solid white'}}>
          SUGGESTED BOOKS BY TITLE:
        </p>
        <div className='bottom'>
          <div className='bottomtop'>
            <SuggestedBooks suggestedBooks={suggestedBooks} 
                            addToFavorites={addToFavorites} 
                            handleBookDetailsClick={handleBookDetailsClick} 
                            setFavoriteBooks={setFavoriteBooks}/>
          </div>
        </div>
        <p className='browse' style={{marginTop: '0px', backgroundColor: 'rgba(59, 117, 115, 0.6)', width: '100vw', borderTop: '1px solid white'}}>
          SUGGESTED BOOKS BY AUTHOR:
        </p>
        <div className='bottom'>
          <div className='bottombottom'>
            <BooksByAuthor books={author} 
                            addToFavorites={addToFavorites} 
                            handleBookDetailsClick={handleBookDetailsClick} 
                            setFavoriteBooks={setFavoriteBooks} />
          </div>
        </div>
      </>
    )
  } else {
    contents = (
      <div className='signupLoginPage'>
        <p>Please signup or login...</p>
        <Login liftToken={setToken} />
        <Signup liftToken={setToken} />
      </div>
    );
  }
  return(
    contents
  )
}

export default App;
