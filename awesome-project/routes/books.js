const express = require('express');
const books  = books.Router();

/* GET home page */
books.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = books;

