var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin/homepage", { title: "Admin" });
});

router.get("/homepage/product", (req, res, next) => {
  res.render("homepage/product", { title: "Product" });
});

router.get("/user/signin", function (req, res, next) {
  res.render("user/signin", { title: "signin" });
});

router.get("/user/signup", function (req, res, next) {
  res.render("user/signup", { title: "signup" });
});

module.exports = router;
