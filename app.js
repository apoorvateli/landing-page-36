var express = require("express"),
app = express(),
mongoose = require("mongoose"),
bodyParser= require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/contacts");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MONGOOSE CONFIG SCHEMA SETUP
var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

var Contact = mongoose.model("Contact", contactSchema);

// Contact.create(
//   {
//     name: "Test name",
//     email: "test@test.com",
//     message: "test message"
//   },
//   function(err, newContact) {
//     if (err) {
//       console.log("ERROR while creating new contact message");
//     }
//     else {
//       console.log("NEW contact added to DB:");
//       console.log(newContact);
//     }
//   }
// );

// Display landing page with contact form
app.get("/", function(req, res) {
  res.render("landing");
});

// CREATE - Create a new contact in the DB
app.post("/createContact", function(req, res) {
  Contact.create(req.body.contact, function(err, newContact) {
    if (err) {
      res.render("landing");
      console.log("ERROR while creating new contact message");
    }
    else {
      res.redirect("/"); // go to landing page
      console.log("NEW contact added to DB:");
      console.log(newContact);
    }
  });
});

app.listen(3000, function() {
  console.log("Serving landing-page-36 on port 3000");
});
