import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';// see header explanation= programmaric navigation (don't physically click link- REDIRECTION)
import { useAuth } from '../context/AuthContext';

//useState to store and update user email and password
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //hook for navigation
  const {setIsAuthenticated} = useAuth();// hook to set authentication state

  //using regex for email validation
  //checks for patterns: no: spaces, @ beginning, fullstop for domain etc
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
//function to handlesubmission. Prevent default submission behaviour
//if email is invalid- pop up alert and user cannot proceed
/ELSE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    // Send a POST request to the backend to authenticate the user
    //Successful submission, then POST request to backend to login user
    const response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),//send email and password in the request body 
    });

    const data = await response.json();//parsing JSON response
    if (response.ok) {
      // Store the JWT token in local storage
      localStorage.setItem('token', data.token);
      // Set auth state to true
      //redirect to landing page 
      setIsAuthenticated(true);
      navigate('/landing');
    } else {
      // Handle login error (e.g., show an error message)
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Please enter your email and password to access your account.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;