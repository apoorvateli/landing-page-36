var express = require("express"),
app = express(),
mongoose = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://localhost/contacts", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.listen(3000, function() {
  console.log("Serving landing-page-36 on port 3000");
});
