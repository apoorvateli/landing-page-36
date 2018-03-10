var express = require("express"),
app = express(),
mongoose = require("mongoose"),
bodyParser= require("body-parser"),
expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect("mongodb://localhost/contacts");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");

// MONGOOSE CONFIG SCHEMA SETUP
var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

var Contact = mongoose.model("Contact", contactSchema);

// Display landing page with contact form
app.get("/", function(req, res) {
  res.render("landing");
});

// CREATE - Create a new contact in the DB
app.post("/createContact", function(req, res) {
  // sanitize the data coming from the contact form
  req.body.contact.name = req.sanitize(req.body.contact.name);
  req.body.contact.email = req.sanitize(req.body.contact.email);
  req.body.contact.message = req.sanitize(req.body.contact.message);
  // create contact
  Contact.create(req.body.contact, function(err, newContact) {
    if (err) {
      res.render("landing");
      console.log("ERROR while creating new contact");
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
