var express = require("express");
var productModel = require("../models/productModel");
var userModel = require("../models/userAdmin");
var router = express.Router();
var passport = require("passport");
/* GET users listing. */
router.get("/user/signup", function (req, res, next) {
  res.render("user/signup", { title: "signup" });
});

router.post("/user/signup", function (req, res, next) {
  res.redirect("/user/signin");
});

module.exports = router;
