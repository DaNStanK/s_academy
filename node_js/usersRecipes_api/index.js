require('dotenv').config();
const express = require('express');
const api = express();
const usersHandler = require('./handlers/users');
const recipesHandler = require('./handlers/recipe')
const { expressjwt: jwt } = require('express-jwt');
const db = require('./pkg/db/db');

db.init();

api.use(express.json());
api.use(jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/create-account',
    '/users',
    '/login',
    '/recipes'
  ]
}));

// users routes
api.post('/create-account', usersHandler.createAccount);
api.get('/users', usersHandler.getAllUsers);
api.post('/login', usersHandler.loginUser);
api.delete('/user/:id', usersHandler.deleteUser);

// recipes api
api.get('/recipes', recipesHandler.getAllRecipes);
api.post('/recipe', recipesHandler.createRecipe);
api.get('/recipe/:id', recipesHandler.getRecipe);
api.put('/recipe/:id', recipesHandler.updateRecipe);
api.delete('/recipe/:id', recipesHandler.deleteRecipe);

api.listen(process.env.PORT, err => {
  if (err) return console.log(`Not connected to the server`, err);
  return console.log(`Successfully connected to the server on port ${process.env.PORT}`);
});