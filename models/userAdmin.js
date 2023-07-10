var mongoose = require("mongoose");
var express = require("express");
var { Schema } = mongoose;
var bcrypt = require("bcrypt");

var userADSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date },
  password: { type: String, required: true },
});

userADSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userADSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("userADSchema", userADSchema);
