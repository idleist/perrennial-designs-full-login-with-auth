const express = require("express");
const router = express.Router();

// DB Models for Testimonials and Projects
var Testimonial = require("../models/testimonials");
var Project = require("../models/projects");

// Require Controllers
const testimonials_controller = require("../controllers/testimonials_controller");
const projects_controller = require("../controllers/projects_controller");

// Is auth middleware - tests if user is logged in (session)
const isAuth = require("../middleware/is-auth");

// Multer for uploading images
var multer = require("multer");

// Set up storage location for file uploads (uploads folder)
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

/*******************
 ADMIN ROUTES /admin
 *******************/

/***** GET /admin *****/

// retrieves all projects and testimonials from db and loads admin page
router.get("/", isAuth, (req, res) => {
  Project.find({}, function(err, db_projects) {
    if (err) {
      console.log(err);
    }
    Testimonial.find({}, function(err, db_testimonial) {
      if (err) {
        console.log(err);
      }
      // Determines if we have an error message present. Without this there would constantly be a border
      // in place on the screen expecting a message.
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("admin", {
        testimonials: db_testimonial,
        projects: db_projects,
        errorMessage: message
      });
    });
  });
});

/***** POST /admin *****/

// create new testimonial
router.post("/testimonial", testimonials_controller.testimonial_create);

// delete testimonials
router.post("/testimonial/delete", testimonials_controller.testimonial_delete);

// create new project
router.post(
  "/projects",
  upload.single("projectImage"),
  projects_controller.postCreateProject
);

// delete project
router.post("/projects/delete", projects_controller.deleteProjectById);

module.exports = router;
