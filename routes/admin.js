const express = require("express");
const router = express.Router();

var Testimonial = require("../models/testimonials");
var Project = require("../models/projects");

// Require Controllers
const testimonials_controller = require("../controllers/testimonials_controller");
const projects_controller = require("../controllers/projects_controller");

// Multer for uploading images
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// Routes

router.get("/", (req, res) => {
  Project.find({}, function(err, db_projects) {
    if (err) {
      console.log(err);
    }
    Testimonial.find({}, function(err, db_testimonial) {
      if (err) {
        console.log(err);
      }
      res.render("admin", {
        testimonials: db_testimonial,
        projects: db_projects
      });
    });
  });
});

// create new testimonial
router.post("/testimonial", testimonials_controller.testimonial_create);

// delete testimonials
router.get(
  "/testimonial/delete/:testimonialid",
  testimonials_controller.testimonial_delete
);

// create new project
router.post(
  "/projects",
  upload.single("projectImage"),
  projects_controller.project_create
);

// delete project
router.get("/projects/delete/:projectid", projects_controller.project_delete);

module.exports = router;
