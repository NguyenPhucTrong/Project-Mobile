const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Admin.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
