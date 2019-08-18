import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import BookListByGenre from './BookListByGenre';
import BookDetails from './BookDetails';
import FavoriteBooks from './FavoriteBooks';
import SuggestedBooks from './SuggestedBooks';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState({});
  const [genre, setGenre] = useState('');
  const [currentGenre, setCurrentGenre] = useState({});
  const [currentBook, setCurrentBook] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState({});
  const [suggestedBooks, setSuggestedBooks] = useState({});
  const [author, setAuthor] = useState({});

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
            // let config = {
            //   headers: {
            //     Authorization: `Bearer ${token}`
            //   }
            // }
            // axios.get('/api/books', config).then((response) => {
            //   setFavoriteBooks(response.data);
            // }).catch(function (error) {
            //   console.log(error);
            // })
          }
      })
    }
  }, [token])//, favoriteBooks.length])

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

  function displaySuggestedBooks(bookTitle) {
    //let title = 'aLice in wonderland'//currentBook[0].title; //favoriteBooks
    //let title = favoriteBooks
    //let title = 'classics'
    
    //console.log("title:", title)
    //let bookTitle = title
    //console.log("bookTitle:", bookTitle.books)
    //bookTitle = bookTitle.toLowerCase().split(' ').join('+');
    //bookTitle = 'classicss'
    console.log('booktitle: ', bookTitle)
    axios.get(`http://openlibrary.org/search.json?title=${bookTitle}`)
      .then(result => {
        setSuggestedBooks(result.data.docs)
        console.log('suggested books:', result.data.docs )
        console.log(bookTitle)
      })
  }

  function displayMoreBooksFromAuthor(author) {
    console.log('author: ', author)
    axios.get(`http://openlibrary.org/search.json?author=${author}`)
        .then(result => {
        setAuthor(result.data.docs)
        console.log('suggested books:', result.data.docs )
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
  // useEffect(() => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   axios.get('/api/books', config).then((response) => {
  //     setFavoriteBooks(response.data);
  //   }).catch(function (error) {
  //     console.log(error);
  //   })
  // }, [favoriteBooks.length])

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
          <BookDetails  bookDetails={currentBook} token={token} setFavoriteBooks={setFavoriteBooks} />
          <SuggestedBooks suggestedBooks={suggestedBooks} handleBookDetailsClick={handleBookDetailsClick} setFavoriteBooks={setFavoriteBooks}/>
          <FavoriteBooks favoriteBooks={favoriteBooks} handleBookDetailsClick={handleBookDetailsClick} displaySuggestedBooks={displaySuggestedBooks} user={user} token={token} />
          <BookListByGenre books={currentGenre} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} />
          <BookList books={apiData} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
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
