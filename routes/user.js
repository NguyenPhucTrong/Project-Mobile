var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var passport = require("passport");
var Product = require("../models/productModel");
var userADSchema = require("../models/userAdmin");

/* GET users listing. */

router.get("/signup", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", {
    title: "signup",
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signin", {
    title: "signin",
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(), res.redirect("/signin");
});

router.get("/profile/:id?", isLoggedIn, (req, res, next) => {
  if (typeof req.params.id === "undefined") {
    res
      .render("user/profile", {
        _id: user._id,
        email: null,
        firstname: null,
        lastname: null,
        age: null,
      })

      .catch(function (err) {
        console.log(err);
        res.redirect("/");
      });
  } else {
    userADSchema
      .findById(req.params.id)
      .then(function (user) {
        res.render("user/profile", {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
        });
      })
      .catch(function (err) {
        console.log(err);
        res.redirect("/");
      });
  }
});

router.post("/profile/:id", (req, res, next) => {
  userADSchema
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
          updatedDate: new Date().toLocaleString(),
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.redirect("/user/profile/" + req.params.id);
    });
});

// userADSchema
// userADSchema
//   .updateOne({
//     _id: req.params.id,
//     $set: {
//       email: req.body.email,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       age: req.body.age,
//       updatedDate: new Date().toLocaleString(),
//     },
//   })
//   .then(function (user) {
//     console.log(user);
//     res.redirect("/");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

router.get("/staff", isLoggedIn, function (req, res, next) {
  res.render("user/staff", { title: "staff" });
  // _id: req.user.id
});

router.post("/staff", function (req, res, next) {
  res.redirect("/user/staff");
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/signin");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
