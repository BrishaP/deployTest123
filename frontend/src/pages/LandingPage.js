import React, { useEffect, useState } from 'react';
import './LandingPage.css'

const LandingPage = () => {
  const [user, setUser] = useState(null);// state to store user variables 

  useEffect(() => {
    //fetch user from backend
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from local storage 
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`,//header includes JWT token in request to authenticate request and verify user identity. 
        },                    //bearer token (token that grants access to resources)
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data); //set user details in state if response is OK(if not then error message)
      } else {
        console.error(data.message);
      }
    };

    fetchUserDetails();// Call the function to fetch user details
  }, []);// Empty dependency array means this effect runs only once after the initial render


  if (!user) {
    return <div>Loading...</div>;// loading message while user details are being fetched
  }

  return (
    <div className="landing-container">
      <div className="profile">
        <h1>Profile</h1>
        <p>Forename: {user.forename}</p>
        <p>Surname: {user.surname}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default LandingPage;