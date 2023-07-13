var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var passport = require("passport");
const multer = require("multer");
const path = require("path");
var Product = require("../models/productModel");
var userADSchema = require("../models/userAdmin");

// Định nghĩa các tùy chọn cho Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imag"); // Change the path to your image storage directory
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Khởi tạo middleware Multer
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", isLoggedIn, function (req, res, next) {
  var _id = req.user ? req.user.id : null;
  res.render("Admin/homepage", { title: "Admin", _id });
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

router.post(
  "/products/add-product",
  upload.single("imagePath"),
  function (req, res, next) {
    const prd = new Product({
      _id: new mongoose.Types.ObjectId(),
      imagePath: req.file.filename,
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
  }
);

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
          imagePath: product.filename,
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

router.post(
  "/products/edit-product/:id",
  upload.single("newImagePath"),
  (req, res, next) => {
    const { id } = req.params;
    const { title, quantity, description, price } = req.body;
    const imagePath = req.file ? req.file.filename : req.body.imagePath;

    Product.updateOne(
      { _id: id },
      {
        $set: {
          imagePath: imagePath,
          title: title,
          quantity: quantity,
          description: description,
          price: price,
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
  }
);

router.delete("/products/delete-product/:id", function (req, res, next) {
  Product.findByIdAndRemove(req.params.id)
    .then(function () {
      console.log(response);
      res.json({ message: "Delete Successfully" });
    })
    .catch(function (err) {
      console.log(err);
      res.json({ message: "Failure" });
    });
});

router.delete("/products/delete-all", function (req, res, next) {
  Product.deleteMany({})
    .then(function () {
      res.json({ message: "Delete All Products Successfully" });
    })
    .catch(function (err) {
      console.log(err);
      res.json({ message: "Failure" });
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
