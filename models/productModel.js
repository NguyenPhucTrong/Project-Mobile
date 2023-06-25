const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://0.0.0.0:27017/projectmobile")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const Product = new Schema({
  isDisplay: { type: Boolean, default: false },
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, require: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date },
});

module.exports = mongoose.model("Product", Product);
