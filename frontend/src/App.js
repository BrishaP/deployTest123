import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//browserRouter enables client-side routing in react application.
import { AuthProvider } from './context/AuthContext';
import Header from './components/header/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

//main entry point for React app
//basic setup, routing and context for app

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage/>}/>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
