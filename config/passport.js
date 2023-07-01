var passport = require("passport");
var UserAdmin = require("../models/userAdmin");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserAdmin.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err);
    });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      UserAdmin.findOne({ email: email })
        .then(function (user) {
          if (user) {
            return done(
              null,
              false,
              req.flash("error", "Email is already in use.")
            );
          }
          var newUser = new UserAdmin();
          console.log(UserAdmin);
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
          newUser
            .save()
            .then(function (result) {
              return done(null, newUser);
            })
            .catch(function (err) {
              return done(err);
            });
        })
        .catch(function (err) {
          if (err) {
            return done(err);
          }
        });
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log("signin");
      UserAdmin.findOne({ email: email })
        .then(function (user) {
          if (!user) {
            return done(null, false, req.flash("error", "No user found."));
          }
          if (!user.validPassword(password)) {
            return done(null, false, req.flash("error", "Wrong password."));
          }
          return done(null, user);
        })
        .catch(function (err) {
          return done(err);
        });
    }
  )
);
