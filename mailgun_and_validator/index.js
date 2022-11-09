require('dotenv').config();
const express = require('express');
const db = require('./pkg/db/db');
const api = express();

const mailHandler = require('./handlers/emails');

db.init();

api.use(express.json());

api.get('/api/v1/emails', mailHandler.getAllEmails);
api.post('/api/v1/emails', mailHandler.createEmail);
api.delete('/api/v1/emails/:id', mailHandler.removeLog);

api.listen(process.env.PORT, err => {
  if(err) {
    return console.log(err);
  }
  return console.log(`Successfully connected to port ${process.env.PORT}`);
});