var express = require("express");
var path = require("path");
var app = express();
var dotenv = require("dotenv");

dotenv.config();

// Routes
const admin = require("./routes/admin.js");
const contact = require("./routes/contact.js");
const services = require("./routes/services.js");
const projects = require("./routes/projects.js");

// Database - MongoDB and Mongoose
var mongo = require("mongodb");
var mongoose = require("mongoose");

var db = mongoose.connection;

// Body Parser
const bodyParser = require("body-parser");

// Database Models
var Testimonial = require("./models/testimonials");
var Project = require("./models/projects");

var port = process.env.PORT || 3000;

// Link public directory to access static files
app.use(express.static(path.join(__dirname, "/public")));

// Set up our view directory where our page files will be
app.set("views", path.join(__dirname, "views"));
// Set our view engine as jade (instead of html)
app.set("view engine", "pug");

// Set up body parser for forms
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use("/admin", admin);
app.use("/contact", contact);
app.use("/services", services);
app.use("/projects", projects);

app.get("/", function(req, res) {
  Project.find({}, function(err, db_projects) {
    if (err) {
      console.log(err);
    }
    Testimonial.find({}, function(err, db_testimonial) {
      if (err) {
        console.log(err);
      }
      res.render("index", {
        testimonials: db_testimonial,
        projects: db_projects
      });
    });
  });
});

app.listen(port);
console.log("Server Started on " + port);
