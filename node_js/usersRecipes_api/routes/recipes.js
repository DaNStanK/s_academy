require('dotenv').config();
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const recipesHandler = require('../handlers/recipe');

router.use(jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/recipes'
  ]
}));

router.get('/recipes', recipesHandler.getAllRecipes);
router.post('/recipe', recipesHandler.createRecipe);
router.get('/recipe/:id', recipesHandler.getRecipe);
router.put('/recipe/:id', recipesHandler.updateRecipe);
router.delete('/recipe/:id', recipesHandler.deleteRecipe);

module.exports = router;