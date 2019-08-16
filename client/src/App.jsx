import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import BookListByGenre from './BookListByGenre';
import BookDetails from './BookDetails';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState({});
  const [genre, setGenre] = useState('');
  const [currentGenre, setCurrentGenre] = useState({});
  const [currentBook, setCurrentBook] = useState({});

  function checkForLocalToken() {
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
            // this.setState({
            //   token: res.data.token,
            //   user: res.data.user,
            //   errorMessage: ''
            // }, this.displayAllBooks)
          }
      })
    }
  }

  function liftToken({token, user}) {
    setToken(token);
    setUser(user);
  }

  function logout() {
    // Remove token from local storage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    setToken('');
    setUser({});
  }

  useEffect(() => {
    checkForLocalToken();
    displayAllBooks()
  }, [])

  function displayAllBooks() {
    let url = 'https://openlibrary.org/subjects/classics.json?limit=100'
    console.log('displaying books...')
    console.log(url)
    //console.log(process.env.NYT_API_KEY)
    axios.get(url).then( result => {
      setApiData(result.data.works)
      // .catch(function (error) {
      //   console.log(error);
      // })
    })
  }

  function handleGenreChange(e) {
    e.preventDefault();
    setGenre(e.target.value);
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

  var user = user;
  console.log(user)
  var contents = ''
  if (user) {
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
          <h2>ALL BOOKS</h2>
          <BookDetails bookDetails={currentBook} />
          <BookListByGenre books={currentGenre} handleBookDetailsClick={handleBookDetailsClick}/>
          <BookList books={apiData} handleBookDetailsClick={handleBookDetailsClick} />
        </div>
      </>
    )
  } else {
    contents = (
        <>
          <p>Please signup or login...</p>
          <Login liftToken={liftToken} />
          <Signup liftToken={liftToken} />
        </>
    );
  }
  return(
    //<p>{contents}</p>
    contents
  )

}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: '',
//       user: null,
//       errorMessage: '',
//       apiData: null,
//       genre: '',
//       currentGenre: null,
//       currentBook: null
//     }
//     this.checkForLocalToken = this.checkForLocalToken.bind(this);
//     this.liftToken = this.liftToken.bind(this);
//     this.logout = this.logout.bind(this);
//     this.displayAllBooks = this.displayAllBooks.bind(this);
//     this.handleGenreChange = this.handleGenreChange.bind(this);
//     this.handleGenreSubmit = this.handleGenreSubmit.bind(this);
//     this.handleBookDetailsClick = this.handleBookDetailsClick.bind(this);
//   }

//   checkForLocalToken() {
//     var token = localStorage.getItem('mernToken');
//     if (!token || token === 'undefined') {
//       // Token is invalid or missing
//       localStorage.removeItem('mernToken');
//       this.setState({
//         token: '',
//         user: null
//       })
//     } else {
//       // Token is found in local storage, verify it
//       axios.post('/auth/me/from/token', {token})
//         .then( res => {
//           if (res.data.type === 'error') {
//             localStorage.removeItem('mernToken')
//             this.setState({
//               token: '',
//               user: null,
//               errorMessage: res.data.message
//             })
//           } else {
//             localStorage.setItem('mernToken', res.data.token);
//             this.setState({
//               token: res.data.token,
//               user: res.data.user,
//               errorMessage: ''
//             }, this.displayAllBooks)
//           }
//         })
//     }
//   }

//   // Array Destructuring way to handle this
//   liftToken({token, user}) {
//     this.setState({
//       token,
//       user
//     })
//   }

//   logout() {
//     // Remove token from local storage
//     localStorage.removeItem('mernToken');
//     // Remove user and token from state
//     this.setState({
//       token: '',
//       user: null
//     })
//   }

//   componentDidMount() {
//     this.checkForLocalToken()
//     //this.displayAllBooks()
//   }

//   displayAllBooks() {
//     // let config = {
//     //   headers: {
//     //     Authorization: `Bearer ${this.state.token}`
//     //   }
//     // }
//     //let url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' 
//     let url = 'https://openlibrary.org/subjects/classics.json?limit=100'
//     console.log('displaying books...')
//     console.log(url)
//     //console.log(process.env.NYT_API_KEY)
//     axios.get(url).then( result => {
//       this.setState({
//         apiData: result.data.works
//       })
//       // .catch(function (error) {
//       //   console.log(error);
//       // })
//     })
//   }

//   handleGenreChange(e) {
//     e.preventDefault();
//     this.setState({
//       genre: e.target.value
//     })
//   }

//   handleGenreSubmit(e) {
//     e.preventDefault()
//     axios.get(`https://openlibrary.org/subjects/${this.state.genre}.json?limit=100`)
//       .then(result => {
//         this.setState({
//           currentGenre: result.data.works
//         })
//       })
//   }

//   handleBookDetailsClick(bookKey) {
//     console.log('fetching details for:', bookKey);
//     var isbn = 'OLID:' + bookKey;
//     console.log("isbn:", isbn)
//     const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&jscmd=data&format=json`;
//     console.log("url is: ",url);
//     axios.get(url).then(result => {
//       //let results = "OLID" + bookKey;
//       console.log("Result:", result.data[isbn])
//       this.setState({
//         currentBook: result.data[isbn]
//       })
//     })
//     //axios.get(`https://openlibrary.org/books/${bookKey}`)
//   }

//   render() {
//     var user = this.state.user
//     console.log(user)
//     var contents = ''
//     if (user) {
//       contents = (
//         <>
//           <div>
//             <p>Hello, {user.name}!</p>
//             <p onClick={this.logout}>Logout</p>
//           </div>
//           <div>
//             <form onSubmit={this.handleGenreSubmit}>
//               <input type="text" 
//                       name="genre" 
//                       placeholder="Please enter the genre" 
//                       onChange={this.handleGenreChange}
//                       value={this.state.genre} />
//               <input type="submit"/>
//             </form>
//             <h2>ALL BOOKS</h2>
//             <BookDetails bookDetails={this.state.currentBook} />
//             <BookListByGenre books={this.state.currentGenre} handleBookDetailsClick={this.handleBookDetailsClick}/>
//             <BookList books={this.state.apiData} handleBookDetailsClick={this.handleBookDetailsClick} />
//           </div>
//         </>
//       )
//     } else {
//       contents = (
//           <>
//             <p>Please signup or login...</p>
//             <Login liftToken={this.liftToken} />
//             <Signup liftToken={this.liftToken} />
//           </>
//       );
//     }
//     return(
//       //<p>{contents}</p>
//       contents
//     )
//   }
// }

export default App;
