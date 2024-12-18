// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   forename: {
//     type: String,
//     required: true,
//   },
//   surname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', userSchema);

// export default User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  forename: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;