var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var passport = require("passport");
var Product = require("../models/productModel");
var userADSchema = require("../models/userAdmin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Admin/homepage", { title: "Admin" });
});

//                                          Product

router.get("/products/product", (req, res, next) => {
  // res.render("homepage/product", { title: "Hello" });
  const data = Product.find()
    .then(function (products) {
      res.render("products/product", { title: "product", products });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/products/add-product", (req, res, next) => {
  res.render("products/add-product", { title: "add-product" });
});

router.post("/products/add-product", function (req, res, next) {
  console.log(req.body.imagePath); // Kiểm tra giá trị của imagePath
  console.log(req.body.title); // Kiểm tra giá trị của title
  console.log(req.body.description); // Kiểm tra giá trị của description
  console.log(req.body.price); // Kiểm tra giá trị của price
  const prd = new Product({
    imagePath: req.body.imagePath,
    title: req.body.title,
    quantity: req.body.quantity,
    description: req.body.description,
    price: req.body.price,
  });
  prd
    .save()
    .then(function (result) {
      console.log(result);
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
});

router.get("/products/edit-product/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then(function (product) {
      res.render("products/edit-product", {
        _id: product._id,
        imagePath: product.imagePath,
        description: product.description,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/products/product");
    });
});

router.post("/products/edit-product/:id", (req, res, next) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        imagePath: req.body.imagePath,
        title: req.body.title,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,
        updatedDate: new Date().toLocaleString(),
      },
    }
  )
    .then(function (product) {
      res.redirect("/products/product");
    })
    .catch(function (err) {
      console.log(err);
    });
});
//                                          User

// router.post(
//   "/user/signin",
//   passport.authenticate("local.signin", {
//     successRedirect: "/",
//     failureRedirect: "/",
//     failureFlash: true,
//   })
// );

router.get("/user/signup", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", {
    title: "signup",
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/user/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/user/signup",
    failureFlash: true,
  })
);
// router.post(
//   "/user/signup",
//   passport.authenticate("local.signup", {
//     successRedirect: "/",
//     failureRedirect: "/",
//     failureFlash: true,
//   })
// );

router.get("/user/signin", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signin", {
    title: "signin",
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/user/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

router.get("/user/profile", (req, res, next) => {
  // UserAdmin.findById(req.user.id)
  //   .then(function (user) {
  //     res.render("user/profile", {
  //       _id: user._id,
  //       email: user.email,
  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       age: user.age,
  //     });
  //   })
  res.render("user/profile", { title: "Text" });
  // .catch((err) => {
  //   console.log(err);
  // });
});

router.post("/user/profile", (req, res, next) => {
  UserAdmin.updateOne({
    _id: req.params.id,
    $set: {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      updatedDate: new Date().toLocaleString(),
    },
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
