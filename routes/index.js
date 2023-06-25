var express = require("express");
const productModel = require("../models/productModel");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin/homepage", { title: "Admin" });
});

router.get("/homepage/product", (req, res, next) => {
  // res.render("homepage/product", { title: "Hello" });
  const data = productModel
    .find()
    .then(function (products) {
      res.render("homepage/product", { title: "product", products });
    })
    .catch((err) => {
      console.log(err);
    });

  // res.render("homepage/product", { title: "product", products: data });
  // console.log({ title: "product", products: data });
});

router.get("/user/signin", function (req, res, next) {
  res.render("user/signin", { title: "signin" });
});

router.get("/user/signup", function (req, res, next) {
  res.render("user/signup", { title: "signup" });
});

module.exports = router;
