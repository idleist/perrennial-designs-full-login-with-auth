const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projects_controller");

/*******************
 PROJECTS ROUTES /project
 *******************/

/***** GET /project *****/
// shows all projects
router.get("/", projectController.getAllProjects);

// /project/{projectID} shows individual project page
router.get("/:project", projectController.getProjectById);

module.exports = router;
