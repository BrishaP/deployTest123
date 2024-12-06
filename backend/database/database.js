import connectDB from './connectDB.js';
//import connectDB FUNCTION from connectDB.js

//run: async function 
//Try block to connect to connectDB function, if error, catch block throws console log messsage 
async function run() {
  try {
    await connectDB();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

run().catch(console.dir);

// THIS TESTS THE CONNECTION TO MONGODB DATABASE BY CALLING CONNECTDB FUNCTION FROM THE CONNECTDB.JS FILE!
// I am using this just for setup purposes, I can get rid of this later.