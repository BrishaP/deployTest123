// import mongoose from 'mongoose'; //Object data modeling for mongoDB & nodejs. Has data validation, can define schemas
// import dotenv from 'dotenv'; //Load environmental variables from .env (don't hardcode and push)
// import path from 'path'; //helps when working with file and directory paths
// import { fileURLToPath } from 'url'; //helps resolve directory and file paths to .env for loading environment variables

// // Get the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables from .env file
// const envPath = path.resolve(__dirname, '../.env');
// console.log(`Loading environment variables from: ${envPath}`);
// dotenv.config({ path: envPath });

// // Retrieve the MongoDB URI from environment variables
// const uri = process.env.MONGODB_URI;

// // Add this line to verify the URI-> REMOVE THIS AFTERWARDS
// // console.log("Loaded MongoDB URI:", uri); 

// //self explanatory
// if (!uri) {
//   throw new Error("MONGODB_URI is not defined in the environment variables");
// }

// //define async function connectDB (connecting to database needs to be async for syncro code to execute), connect to mongoDB using mongopse.connect method (from mongoose library- connect to DB), uri is stored in uri variable, if not defined try catch throws error
// //try block (if the mongoDB connection via mongoose.connect doesn't work)
// //catch block (if there's an error this block executes and console logs error message with failure code 1)
// //process.exit(Code) to terminate node.js process, 0 is successful and non-zero error). Prevents application running in 'invalid' state.
// const connectDB = async () => {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// // export default connectDB;

// import mongoose from 'mongoose'; //Object data modeling for mongoDB & nodejs. Has data validation, can define schemas

// // Retrieve the MongoDB URI from environment variables
// const uri = process.env.MONGODB_URI;

// //self explanatory
// if (!uri) {
//   throw new Error("MONGODB_URI is not defined in the environment variables");
// }

// //define async function connectDB (connecting to database needs to be async for syncro code to execute), connect to mongoDB using mongopse.connect method (from mongoose library- connect to DB), uri is stored in uri variable, if not defined try catch throws error
// //try block (if the mongoDB connection via mongoose.connect doesn't work)
// //catch block (if there's an error this block executes and console logs error message with failure code 1)
// //process.exit(Code) to terminate node.js process, 0 is successful and non-zero error). Prevents application running in 'invalid' state.
// const connectDB = async () => {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;