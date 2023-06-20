var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin/homepage", { title: "Admin" });
});

router.get("/homepage/product", (req, res, next) => {
  res.render("homepage/product", { title: "Product" });
});

module.exports = router;
