// import jwt from 'jsonwebtoken'; // to verify JWT tokens
// //we are interacting with user data in DB, fetch user details based on user ID decoded from JWT token
// import User from './user.js';
// //async function authMiddleware
// const authMiddleware = async (req, res, next) => {
//   //token extracted from req header. Looks for authorisation header from incoming req (Containing JWT token). Remove 'bearer' word which is usually with token
//   const token = req.header('Authorization').replace('Bearer ', '');

//   //check if token exists, if not 401 error and message
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   //verify authenticity of token- compare the JWT token when you logged in (the signature) to the JWT_secret in environment variables
//     // If token is valid 'decoded' will contain decoded info from token including user ID
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //find user by ID encoded in token and exclude password field from result
//     req.user = await User.findById(decoded.userId).select('-password');
//     //call next middleware- passes on to next step/ passes control 
//     next();
//   } catch (error) {
//     //if the try block of verifying doesn't work- e.g token is invalid then the catch will throw error message
//     console.error(error);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// export default authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('./user.js');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;