const express = require('express');
const mongoose = require('mongoose');
const pages = require('./handlers/pages');
const callbacks = require('./handlers/callbacks');
require('dotenv').config();

const dsn = process.env.DATA_URL;
const port = process.env.PORT;

mongoose.connect(
    dsn,
    err => {
        if(err) return console.log(err);
        console.log('Connected to DB');
    }
);

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', pages.main); // all blogposts
app.get('/blogpost/:id', pages.singleBlogpost); // single blogpost
app.get('/form', pages.formAdd); // form to create new blogpost
app.get('/form/:id', pages.formEdit); // form to edit a blogpost

app.post('/callback/post', callbacks.create); // creates new blogpost
app.post('/callback/post/:id', callbacks.edit); // edits existing blogpost
app.get('/callback/remove/:id', callbacks.remove); // deletes a blogpost

app.listen(port, err => {
    if(err) return console.log(err);
    console.log(`Server successfully started on port ${port}`);
});