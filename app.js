const path = require("path");
// Global PORT variable
const port = process.env.PORT || 3000;

// Express JS, Express Session, Connect-Flash
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

// Body Parser - to use form data within the app
const bodyParser = require("body-parser");

// Mongoose - to work with MongoDB
const mongoose = require("mongoose");

// DotEnv
const dotenv = require("dotenv");
dotenv.config();

// MongoDB Session storage
const MongoDBStore = require("connect-mongodb-session")(session);

// Routes
const admin = require("./routes/admin.js");
const contact = require("./routes/contact.js");
const services = require("./routes/services.js");
const projects = require("./routes/projects.js");
const auth = require("./routes/auth.js");

// Database Models
const Testimonial = require("./models/testimonials");
const Project = require("./models/projects");

const app = express();

// Initialise new MongoDB store for sessions
const store = new MongoDBStore({
  uri: `${process.env.MONGOLAB_URI}`,
  collection: "sessions"
});

// Set up our view directory where our page files will be
app.set("views", path.join(__dirname, "views"));

// Set our view engine as pug
app.set("view engine", "pug");

// Link public directory to access static files
app.use(express.static(path.join(__dirname, "/public")));

// Set up body parser for forms
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Express Session middleware
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Initialise Connect-Flash (for custom error messages)
app.use(flash());

// Initiate local variable on every res. (the isLogged in variable) to check if session cookie is stored and user is logged in
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Use Express Router Middleware for routes
app.use("/admin", admin);
app.use("/contact", contact);
app.use("/services", services);
app.use("/projects", projects);
app.use("/pd-admin", auth);

/***** GET Landing page route (index route)*****/
// retrieves all Projects and Testimonials from DB and renders homepage
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
        // isLoggedIn: req.session.isLoggedIn
      });
    });
  });
});

// Connect to MongoDB (via mongoose) and start server
mongoose
  .connect(`${process.env.MONGOLAB_URI}`)
  .then(result => {
    app.listen(port, err => {
      if (err) {
        console.log(err);
      }
      console.log(`database connected: server started on port: ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
