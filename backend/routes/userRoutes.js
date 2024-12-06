import express from 'express';
import User from '../database/models/user.js'; //using the schema, moongoose model for user schema to interact with DB
import bcrypt from 'bcryptjs'; //library for hashing passwords to securely store them 
import jwt from 'jsonwebtoken'; // library for generating and verifying JWT for auth 

// Express router, to define routes and handle HTTP requests for specific paths 
const router = express.Router();

// User Registration
//defines POST route for reg
//extracts user details from req body 

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

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
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

   //Promise, using await to ensure code wait until user is saved before proceeding 
   //The response for resource created should be 201, but I am changing this to 200 OK for this purpose- change back after
 
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//exporting here, to inport in server.js
export default router;
