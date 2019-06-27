var Project = require("../models/projects");
var path = require("path");
var fs = require("fs");

// Create controller - creates new project document
exports.project_create = (req, res) => {
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

// Delete controller - deleted the project document and removes associated image from uploads folder
exports.project_delete = (req, res) => {
  var id = req.params.projectid;
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
