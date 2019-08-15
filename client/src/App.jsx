import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import BookListByGenre from './BookListByGenre';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
      genre: '',
      currentGenre: null
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
    this.displayAllBooks = this.displayAllBooks.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleGenreSubmit = this.handleGenreSubmit.bind(this);
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Token is found in local storage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            }, this.displayAllBooks)
          }
        })
    }
  }

  // Array Destructuring way to handle this
  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  componentDidMount() {
    this.checkForLocalToken()
    //this.displayAllBooks()
  }

  displayAllBooks() {
    // let config = {
    //   headers: {
    //     Authorization: `Bearer ${this.state.token}`
    //   }
    // }
    //let url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' 
    let url = 'https://openlibrary.org/subjects/classics.json?limit=100'
    console.log('displaying books...')
    console.log(url)
    //console.log(process.env.NYT_API_KEY)
    axios.get(url).then( result => {
      this.setState({
        apiData: result.data.works
      })
      // .catch(function (error) {
      //   console.log(error);
      // })
    })
  }

  handleGenreChange(e) {
    e.preventDefault();
    this.setState({
      genre: e.target.value
    })
  }

  handleGenreSubmit(e) {
    e.preventDefault()
    axios.get(`https://openlibrary.org/subjects/${this.state.genre}.json?limit=100`)
      .then(result => {
        this.setState({
          currentGenre: result.data.works
        })
      })
  }

  render() {
    var user = this.state.user
    console.log(user)
    var contents = ''
    if (user) {
      contents = (
        <>
          <div>
            <p>Hello, {user.name}!</p>
            <p onClick={this.logout}>Logout</p>
          </div>
          <div>
            <form onSubmit={this.handleGenreSubmit}>
              <input type="text" 
                      name="genre" 
                      placeholder="Please enter the genre" 
                      onChange={this.handleGenreChange}
                      value={this.state.genre} />
              <input type="submit"/>
            </form>
            <BookListByGenre books={this.state.currentGenre} />
            <BookList books={this.state.apiData} />
          </div>
        </>
      )
    } else {
      contents = (
          <>
            <p>Please signup or login...</p>
            <Login liftToken={this.liftToken} />
            <Signup liftToken={this.liftToken} />
          </>
      );
    }
    return(
      //<p>{contents}</p>
      contents
    )
  }
}

export default App;
