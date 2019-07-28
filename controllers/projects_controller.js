var Project = require("../models/projects");
var path = require("path");
var fs = require("fs");

/*******************
 PROJECTS CONTROLLERS
 *******************/

// Find all projects from DB and render projects page
exports.getAllProjects = (req, res, next) => {
  Project.find({}, function(err, db_projects) {
    if (err) {
      console.log(err);
    }
    res.render("projects", {
      projects: db_projects
      // isLoggedIn: req.session.isLoggedIn
    });
  });
};

// Find project by ID and render single project page
exports.getProjectById = (req, res, next) => {
  Project.findById(req.params.project, function(err, db_project) {
    if (err) {
      console.log(err);
    }
    res.render("project", {
      project: db_project
    });
  });
};

// Creates New project document (by admin only) and adds to DB
exports.postCreateProject = (req, res) => {
  var projectName = req.body.name;
  var description = req.body.description;
  var imageSource = req.file.filename;
  var imageAlt = req.body.imageAlt;

  console.log(req.file);

  var newProject = new Project({
    imageSource: imageSource,
    imageAlt: imageAlt,
    name: projectName,
    desc: description
  });
  console.log(newProject);
  newProject.save(function(err) {
    if (err) throw err;
  });

  res.redirect("/admin");
};

// Deletes the project document and removes associated image from uploads folder (admin only)
exports.deleteProjectById = (req, res) => {
  var id = req.body.projectid;
  Project.findByIdAndDelete(id, function(err, project) {
    if (err) {
      console.log(err);
    }

    console.log(project + "deleted");

    let imagePath = path.join("public/uploads", project.imageSource);
    fs.unlink(imagePath, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${project.imageSource} deleted`);
    });
    res.redirect("/admin");
  });
};
