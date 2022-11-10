require('dotenv').config();
const express = require('express');
const api = express();
const usersRoutes = require('./routes/users');
const recipesRoutes = require('./routes/recipes');
const db = require('./pkg/db/db');

db.init();

api.use(express.json());

api.use(usersRoutes);
api.use(recipesRoutes);

api.listen(process.env.PORT, err => {
  if(err) return console.log(`Not connected to the server`, err);
  return console.log(`Successfully connected to the server on port ${process.env.PORT}`);
});