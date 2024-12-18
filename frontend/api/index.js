// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import connectDB from '../backend/database/connectDB.js';
// import userRoutes from '../backend/routes/userRoutes.js';

// // use connectDB function to establish connection to mongo DB
// connectDB();

// //creates Express app instance- acts as server- define routes and handle requests 
// //configures server and sets up middleware routes etc
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/user', userRoutes);

// // Export the app as a serverless function
// export default app;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connectDB.js')
const userRoutes = require('./userRoutes.js')

// use connectDB function to establish connection to mongo DB
connectDB();

//creates Express app instance- acts as server- define routes and handle requests 
//configures server and sets up middleware routes etc
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);

// Export the app as a serverless function
module.exports = app;