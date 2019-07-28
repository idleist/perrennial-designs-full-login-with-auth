const express = require("express");
const router = express.Router();

// Require Auth Controller functions
const authController = require("../controllers/auth_controller");

/*******************
 AUTH ROUTES /pd-admin
 *******************/

/***** GET /pd-admin  *****/
router.get("/", authController.getLogin);

/***** POST /pd-admin  *****/
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

// /pd-admin/signup Adds new administrators to the website + validation middleware
router.post("/signUp", authController.postSignup);

module.exports = router;
