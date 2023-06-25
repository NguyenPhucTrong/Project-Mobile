var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/user/signin", function (req, res, next) {
  res.render("user/signin", { title: "signin" });
});

module.exports = router;
