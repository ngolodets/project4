import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import BookListByGenre from './BookListByGenre';
import BookDetails from './BookDetails';
import FavoriteBooks from './FavoriteBooks';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState({});
  const [genre, setGenre] = useState('');
  const [currentGenre, setCurrentGenre] = useState({});
  const [currentBook, setCurrentBook] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState({});

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

  function displayAllBooks() {
    let url = 'https://openlibrary.org/subjects/classics.json?limit=100'
    console.log('displaying books...')
    console.log(url)
    axios.get(url).then( result => {
      setApiData(result.data.works)
    }).catch(function (error) {
      console.log(error);
    })
  }

  function handleGenreChange(e) {
    e.preventDefault();
    setGenre(e.target.value);
  }

  function handleGenreSubmit(e) {
    e.preventDefault()
    axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=100`)
      .then(result => {
        setCurrentGenre(result.data.works)
      })
  }

  function handleBookDetailsClick(bookKey) {
    console.log('fetching details for:', bookKey);
    var isbn = 'OLID:' + bookKey;
    console.log("isbn:", isbn)
    const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&jscmd=data&format=json`;
    console.log("url is: ",url);
    axios.get(url).then(result => {
      //let results = "OLID" + bookKey;
      console.log("Result:", result.data[isbn])
      setCurrentBook(result.data[isbn])
    })
  }

  function showFavoriteBooks() {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get('/api/books', config).then(result => {
      setFavoriteBooks(result.data)
    })
    console.log('favorite books:', favoriteBooks)
  } 

  //console.log(user)
  var contents = ''
  if (Object.keys(user).length > 1) {
    contents = (
      <>
        <div>
          <p>Hello, {user.name}!</p>
          <p onClick={logout}>Logout</p>
        </div>
        <div>
          <form onSubmit={handleGenreSubmit}>
            <input type="text" 
                    name="genre" 
                    placeholder="Please enter the genre" 
                    onChange={handleGenreChange}
                    value={genre} />
            <input type="submit"/>
          </form>
          {/* <h2>ALL BOOKS</h2>  */}
          <BookDetails bookDetails={currentBook} />
          <FavoriteBooks favoriteBooks={favoriteBooks} handleBookDetailsClick={handleBookDetailsClick} user={user} token={token} />
          <BookListByGenre books={currentGenre} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} />
          <BookList books={apiData} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} />
        </div>
      </>
    )
  } else {
    contents = (
      <>
        <p>Please signup or login...</p>
        <Login liftToken={setToken} />
        <Signup liftToken={setToken} />
      </>
    );
  }
  return(
    contents
  )
}

export default App;
