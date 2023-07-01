var User = require("../models/userAdmin");
var mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/projectmobile")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

var users = [
  new User({
    email: "text@text.com",
    password: "1234",
  }),
];

Promise.all(users.map((user) => user.save()))
  .then((results) => {
    console.log(`${results.length} user saved`);
    exit();
  })
  .catch((error) => {
    console.error(`Error saving products: ${error}`);
    exit();
  });

function exit() {
  mongoose.disconnect();
}
