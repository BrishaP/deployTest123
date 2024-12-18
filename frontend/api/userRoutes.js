import express from 'express';
import User from '../database/models/user.js'; //using the schema, moongoose model for user schema to interact with DB
import bcrypt from 'bcryptjs'; //library for hashing passwords to securely store them 
import jwt from 'jsonwebtoken'; // library for generating and verifying JWT for auth 
import authMiddleware from '../authMiddleware.js';

// Express router, to define routes and handle HTTP requests for specific paths 
const router = express.Router();

// User Registration
//defines POST route for reg
//extracts user details from req body 

router.post('/register', async (req, res) => {
  const { forename, surname, email, password } = req.body;

  if (!forename || !surname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  } 

//checks database to see if DB for a user with same email exists
//if so 400 status code 

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    //if email doesn't exist in DB, new user created 
    //password hashed using bcrypt.js 
    //salting--> to do with how algorithm encrypts password (allows diff users having same password as well as other reasons)
    //adds random data to password before hashing to ensure uniqueness & security
    user = new User({
      forename,
      surname,
      email,
      password: await bcrypt.hash(password, 10),
    });

   //Promise, using await to ensure code wait until user is saved before proceeding 
   //save user to DB using await to ensure code waits until user is saved before proceeding
   //The response for resource created should be 201, but I am changing this to 200 OK for this purpose- change back after
 
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user exists using an async DB query using mongoose findOne 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    //using bcrypt to compare text password in req body to hashed password in DB
    //returns true for match and false otherwise
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    //creates JWT containing anique userID, so can identify user in authenticated requests
    //gets JWT token from env file 
    //Give this token 1hhr expiration, after this user has to sign in again
    //the JWT generatedd stored in token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Details
// GET route to fetch user details
//authmiddleware async function so only authenticaed users can access this route
router.get('/', authMiddleware, async (req, res) => {
  try {
    //responds with user details attached to req object by authmiddleware
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//exporting here, to inport in server.js
export default router;
