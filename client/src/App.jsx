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
//import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';

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
    console.log('displaying books...')
    console.log(url)
    axios.get(url).then( result => {
      setApiData(result.data.works)
    }).catch(function (error) {
      console.log(error);
    })
  }

  // displays the list of book suggestions based on the current book title
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

  // displays the list of book suggestions based on the current author
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
    let value = e.target.value.toLowerCase()
    //setGenre(e.target.value);
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
    console.log('favorite books:', favoriteBooks)
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

  //console.log(user)
  var contents = ''
  if (Object.keys(user).length > 1) {
    contents = (
      <>
        {/* <nav style={{position: 'fixed', backgroundColor: 'lightblue'}}> */}
            {/* <Link to='/' style={{textDecoration: 'none',
                          color: 'black',
                          margin: '5px',
                          padding: '5px',
                          float: 'left',}}>HOME{' '} </Link> */}
            {/* <Link to={`/mybooks/${user._id}`} style={{textDecoration: 'none',
                          color: 'black',
                          margin: '5px',
                          padding: '5px',
                          float: 'left',}}>MY BOOKS</Link> */}
            {/* <p onClick={logout} style={{position: "inline-block",
                                            color: 'black',
                                            float: "right",
                                            margin: '5px',
                                            padding: '5px'}}>LOGOUT                        
            </p> */}
          {/* </nav> */}
        <h5 className='title'>MY BOOKS APP</h5>
        <div className="header">
          <div id='hello'>HELLO, {user.name}!</div>
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
          <div id='goodbye' onClick={logout}>LOGOUT</div>
        </div>
        <div>
            {/* <Route exact path='/' render={ props => <DrinkAll  apiData={this.state.apiData} 
                                                              token={this.state.token} 
                                                              refreshUser={this.checkForLocalToken} 
                                                              handleDetailsClick={this.handleDetailsClick} {...props} />}/>            
            <Route value={genre} exact path='/:id' render={ props => <DrinkShow drink={current} {...props} />}/>  
            <Route exact path='/favorites/:id' render={ props => <MyDranks 
                                              user={user} 
                                              apiData={this.state.apiData} 
                                              token={this.state.token} 
                                              refreshUser={this.checkForLocalToken} 
                                              handleDetailsClick={this.handleDetailsClick} {...props} />}/>           */}
        </div>
        <div className='flex-container'>
          <div className='left'>
            <div className='leftlist'>
              <BookListByGenre books={currentGenre} addToFavorites={addToFavorites} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
              <BookList books={apiData} addToFavorites={addToFavorites} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
          </div>
          <div className='right'>
            <div className='rightdetail'>
            <BookDetails  bookDetails={currentBook} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
            <div className='rightfave'>
              <FavoriteBooks favoriteBooks={favoriteBooks} handleBookDetailsClick={handleBookDetailsClick} displaySuggestedBooks={displaySuggestedBooks} user={user} token={token} showFavoriteBooks={showFavoriteBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} />
            </div>
          </div>
        {/* <div>
          <Route style={{position: 'fixed'}} exact path='/' render={ props => <BookList books={apiData} 
                                                          handleBookDetailsClick={handleBookDetailsClick} 
                                                          token={token} setFavoriteBooks={setFavoriteBooks} 
                                                          displaySuggestedBooks={displaySuggestedBooks} 
                                                          displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} {...props}/>} />
        </div> */}
        </div>
        <div className='bottom'>
            {/* <h2>ALL BOOKS</h2>  */}
            {/* <BookList books={apiData} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} /> */}
            {/* <BookListByGenre books={currentGenre} handleBookDetailsClick={handleBookDetailsClick} token={token} setFavoriteBooks={setFavoriteBooks} displaySuggestedBooks={displaySuggestedBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} /> */}
            {/* <BookDetails  bookDetails={currentBook} token={token} setFavoriteBooks={setFavoriteBooks} /> */}
            {/* <FavoriteBooks favoriteBooks={favoriteBooks} handleBookDetailsClick={handleBookDetailsClick} displaySuggestedBooks={displaySuggestedBooks} user={user} token={token} showFavoriteBooks={showFavoriteBooks} displayMoreBooksFromAuthor={displayMoreBooksFromAuthor} /> */}
            <div className='bottomtop'>
              <SuggestedBooks suggestedBooks={suggestedBooks} addToFavorites={addToFavorites} handleBookDetailsClick={handleBookDetailsClick} setFavoriteBooks={setFavoriteBooks}/>
            </div>
            <div className='bottombottom'>
              <BooksByAuthor books={author} addToFavorites={addToFavorites} handleBookDetailsClick={handleBookDetailsClick} setFavoriteBooks={setFavoriteBooks} />
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
