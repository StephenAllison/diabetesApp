const express = require("express");
const multer = require("multer");
const router = express.Router();
const Picture = require("../models/picture");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
