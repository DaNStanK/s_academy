require('dotenv').config();
const mongoose = require('mongoose');

const init = () => {
  mongoose.connect(
    process.env.DB_URI,
    err => {
      if(err) {
        return console.log('Could not connect to database!');
      }
      return console.log('Successfully connected do database!');
    }
  )
};

module.exports = {
  init
}