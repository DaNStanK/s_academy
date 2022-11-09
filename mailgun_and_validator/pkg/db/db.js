require('dotenv').config();
const mongoose = require('mongoose');

const init = () => {
  const dsn = process.env.DB_URI;

  mongoose.connect(
    dsn,
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