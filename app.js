var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var flash = require("connect-flash");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var passport = require("passport");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var formidable = require("formidable");
var multer = require("multer");
var MongoStore = require("connect-mongo");
var { param } = require("password-validator");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");

var app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/projectmobile")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

require("./config/passport");
const { Passport } = require("passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "mysuperserect",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
