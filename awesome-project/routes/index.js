// THE WORD "router" IS SUBSTITUTED WITH YOUR VARIABLE
const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

