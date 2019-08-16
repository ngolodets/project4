import React, {useState} from 'react';
import axios from 'axios';

function Signup({liftToken}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleNameChange(e) {
    setName(e.target.value)
    //     this.setState({
    //       [e.target.name]: e.target.value //e.target.name is the name of the element in the form, 
    //     })
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/signup', {
      name: name,
      email: email,
      password: password
    }).then(res => {
      if (res.data.type === 'error') {
        setName('');
        setEmail('');
        setPassword('');
        setMessage(res.data.message)
      } else {
        localStorage.setItem('mernToken', res.data.token)
        liftToken(res.data)
      }
    }).catch(err => {
      setMessage("Maximum accounts exceeded. Please try again later.")
    })
  }

  return (
    <div className="signup">
      <h3>Create a New Account:</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleNameChange}
                value={name} 
                type="text" 
                name="name"
                placeholder="Enter your name..." /><br />
        <input onChange={handleEmailChange}
                value={email}
                type="email"
                name="email" 
                placeholder="Enter your email..." /><br />
        <input onChange={handlePasswordChange}
                value={password}
                type="password"
                name="password" 
                placeholder="Choose a password..." /><br />
        <input type="submit" value="Sign up!" />
      </form>
    </div>
  )

}

// class Signup extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       email: '',
//       password: '',
//       message: ''
//     }
//     this.handleInputChange = this.handleInputChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleInputChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value //e.target.name is the name of the element in the form, 
//                                       //allows to assign whatever we want instead of typing out separate things
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault()
//     axios.post('/auth/signup', {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password
//     }).then(res => {
//       if (res.data.type === 'error') {
//         this.setState({
//           name: '',
//           email: '',
//           password: '',
//           message: res.data.message
//         })
//       } else {
//         localStorage.setItem('mernToken', res.data.token)
//         this.props.liftToken(res.data)
//       }
//     }).catch(err => {
//       this.setState({
//         message: "Maximum accounts exceeded. Please try again later."
//       })
//     })
//   }

//   render() {
    // return (
    //   <div className="signup">
    //     <h3>Create a New Account:</h3>
    //     <form onSubmit={this.handleSubmit}>
    //       <input onChange={this.handleInputChange}
    //               value={this.state.name} 
    //               type="text" 
    //               name="name"
    //               placeholder="Enter your name..." /><br />
    //       <input onChange={this.handleInputChange}
    //               value={this.state.email}
    //               type="email"
    //               name="email" 
    //               placeholder="Enter your email..." /><br />
    //       <input onChange={this.handleInputChange}
    //               value={this.state.password}
    //               type="password"
    //               name="password" 
    //               placeholder="Choose a password..." /><br />
    //       <input type="submit" value="Sign up!" />
    //     </form>
    //   </div>
    // )
  //}
//}

export default Signup;