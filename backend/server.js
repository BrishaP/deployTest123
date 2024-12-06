import express from 'express';// web framework for nodes.js web apps and API's, handles routing etc. handle http requests
import bodyParser from 'body-parser'; //parse incoming request bodies (before route handlers) req.body
import cors from 'cors';// allows server to accept requests from different origins/websites to this server (Same origin policy blocks this usually)
import connectDB from '../backend/database/connectDB.js';
import userRoutes from '../backend/routes/userRoutes.js';

// use connectDB function to establish connection to mongo DB
connectDB();

//creates Express app instance- acts as server- define routes and handle requests 
//configures server and sets up middleware routes etc
const app = express();

// Middleware
//Cors (From earlier) allows server to hanfle requests from diff origins (e.g if I run frontend from diff port or domain)
app.use(cors());
//use body-parser to automatically parse incoming JSON data e.g from POST request
app.use(bodyParser.json());

// Routes
//Express server to use userRoutes to handle requests starting with /user
//good to organise code by grouping routes (e.g all user resources)
app.use('/user', userRoutes);

// Start the server
//proces.env.PORT- checks port in environment variables and if not defaults to port 5000 locally
//this way can adapt to diff environments in production

const PORT = process.env.PORT || 5000;
//starts Express server and listens for incoming requests from on the port defined ABOVE (LINE 29)
//When server starts, callback function runs and logs message to console- check if running
//ALLOWS SERVER TO ACCEPT REQUESTS
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//If frontend app is hosted on http://localhost:3000 and backend server (like this) is running on http://localhost:5000, frontend will need to make requests to the backend. Normally, the browser would block these requests because they come from different origins (ports in this case), but with cors() middleware, you can allow such requests.