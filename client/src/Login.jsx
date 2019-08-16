import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Login({liftToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleEmailChange(e) {
    //e.preventDefault();
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: email,
      password: password
    }).then(res => {
      if (res.data.type === 'error') {
        setMessage(message)
      } else {
        localStorage.setItem('mernToken', res.data.token)
        liftToken(res.data)
      }
    }).catch(err => {
      setMessage("Maximum login attempts exceeded. Please try again later.")
    })
  }

  return (
    <div className='login'> 
      <h3>Log into Your Account:</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleEmailChange} 
                value={email} 
                type="email"
                name="email"
                placeholder="Enter your email..." /><br />
        <input onChange={handlePasswordChange}
                value={password}
                type="password" 
                name="password"
                placeholder="Enter your password..." /><br />
        <input type="submit" value="Log in!" />
      </form>
    </div>
  );

}

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       message: ''
//     }
//     this.handleEmailChange = this.handleEmailChange.bind(this)
//     this.handlePasswordChange = this.handlePasswordChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleEmailChange(e) {
//     // e.preventDefault() <-- not needed here b/c it's not a link nor a form
//     this.setState({
//       email: e.target.value
//     })
//   }

//   handlePasswordChange(e) {
//     this.setState({
//       password: e.target.value
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault()
//     axios.post('/auth/login', {
//       email: this.state.email,
//       password: this.state.password
//     }).then(res => {
//       if (res.data.type === 'error') {
//         this.setState({
//           message: res.data.message
//         })
//       } else {
//         localStorage.setItem('mernToken', res.data.token)
//         this.props.liftToken(res.data)
//       }
//     }).catch(err => {
//       this.setState({
//         message: "Maximum login attempts exceeded. Please try again later."
//       })
//     })
//   }

//   render() {
//     return (
//       <div className='login'> 
//         <h3>Log into Your Account:</h3>
//         <form onSubmit={this.handleSubmit}>
//           <input onChange={this.handleEmailChange} 
//                   value={this.state.email} 
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email..." /><br />
//           <input onChange={this.handlePasswordChange}
//                   value={this.state.password}
//                   type="password" 
//                   name="password"
//                   placeholder="Enter your password..." /><br />
//           <input type="submit" value="Log in!" />
//         </form>
//       </div>
//     );
//   }
// }

export default Login;