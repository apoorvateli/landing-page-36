var express = require("express"),
app = express(),
mongoose = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://localhost/contacts", {useMongoClient: true});
app.use(express.static("public"));
app.set("view engine", "ejs");

// MONGOOSE CONFIG SCHEMA SETUP
var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

var Contact = mongoose.model("Contact", contactSchema);

Contact.create(
  {
    name: "Test name",
    email: "test@test.com",
    message: "test message"
  },
  function(err, newContact) {
    if (err) {
      console.log("ERROR while creating new contact message");
    }
    else {
      console.log("NEW contact added to DB:");
      console.log(newContact);
    }
  }
);

app.get("/", function(req, res) {
  res.render("landing");
});

app.listen(3000, function() {
  console.log("Serving landing-page-36 on port 3000");
});
