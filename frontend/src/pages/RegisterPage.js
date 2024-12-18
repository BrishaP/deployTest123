import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'

const RegisterPage = () => {
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase()); //converts to string & to lowercase and tests against regex ;rules'
  };

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
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Send a POST request to the backend to register the user
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //specifies headers (key-value pairs) to include in request. soecifies req contains JSON and to expect JSON in req body
      },
      body: JSON.stringify({ forename, surname, email, password }),//converts user JavaScript object containing user detaiils into JSON string 
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to the login page after successful registration
      navigate('/login');
    } else {
      // Handle registration error (e.g., show an error message)
      alert(data.message);// data defined by parsing JSOn response from server. Message from JSON response from server
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <p>Please enter your details to create an account.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Forename:</label>
            <input
              type="text"
              value={forename}
              onChange={(e) => setForename(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">Register</button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;