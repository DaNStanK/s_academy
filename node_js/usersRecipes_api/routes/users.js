require('dotenv').config();
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const usersHandler = require('../handlers/users');

router.use(jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/create-account',
    '/users',
    '/login'
  ]
}));

router.post('/create-account', usersHandler.createAccount);
router.get('/users', usersHandler.getAllUsers);
router.post('/login', usersHandler.loginUser);
router.delete('/user/:id', usersHandler.deleteUser);

module.exports = router;