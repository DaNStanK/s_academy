require('dotenv').config();
const mongoose = require('mongoose');

const init = () => {
  const dsn = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`

  mongoose.connect(
    dsn,
    err => {
      if(err) {
        return console.log('Could not connect to db', err);
      }
      console.log('Successfully connected to db');
    }
  );
};

module.exports = {
  init
}