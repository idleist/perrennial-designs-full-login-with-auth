const express = require("express");
const router = express.Router();

var Project = require("../models/projects");

// Routes

router.get("/", (req, res) => {
  Project.find({}, function(err, db_projects) {
    if (err) {
      console.log(err);
    }
    res.render("projects", {
      projects: db_projects
    });
  });
});

router.get("/:project", (req, res) => {
  Project.findById(req.params.project, function(err, db_project) {
    if (err) {
      console.log(err);
    }
    res.render("project", {
      project: db_project
    });
  });
});

module.exports = router;
