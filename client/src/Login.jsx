import React, {useState} from 'react';
import axios from 'axios';

function Login({liftToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleEmailChange(e) {
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

export default Login;