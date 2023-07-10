var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var passport = require("passport");
var Product = require("../models/productModel");
var userADSchema = require("../models/userAdmin");

/* GET home page. */
router.get("/", isLoggedIn, function (req, res, next) {
  var _id = req.user ? req.user.id : null;
  //, _id: req.user.id
  res.render("Admin/homepage", { title: "Admin", _id });
});

app.post("/getsearch", (req, res) => {
  let payload = req.body.payload.trim();
  console.log(payload);
});

//                                          Product

router.get("/products/product", isLoggedIn, (req, res, next) => {
  // res.render("homepage/product", { title: "Hello" });
  var _id = req.user ? req.user.id : null;

  const data = Product.find()
    .then(function (products) {
      res.render("products/product", {
        title: "product",
        _id,
        products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/products/add-product", isLoggedIn, (req, res, next) => {
  var _id = req.user.id;

  res.render("products/add-product", {
    title: "add-product",
    _id,
  });
});

router.post("/products/add-product", function (req, res, next) {
  var _id = req.user._id;
  const prd = new Product({
    _id,
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

router.get("/products/edit-product/:id?", isLoggedIn, (req, res, next) => {
  if (typeof req.params.id === "undefined") {
    // Xử lý khi không có id
    res.render("products/edit-product", {
      id: req.user.id,
      _id: null,
      imagePath: null,
      description: null,
      title: null,
      price: null,
      quantity: null,
    });
  } else {
    // Xử lý khi có id
    Product.findById(req.params.id)
      .then(function (product) {
        if (!product) {
          return res.redirect("/products/product");
        }
        res.render("products/edit-product", {
          id: req.user.id,
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
  }
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

router.delete("/products/delete-product/:id", function (req, res, next) {
  Product.findByIdAndRemove(req.params.id)
    .then(function () {
      res.json({ messsage: "Delete Succesfully" });
    })
    .catch(function (err) {
      console.log(err);
      res.json({ messsage: "Failure" });
    });
});

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

module.exports = router;
