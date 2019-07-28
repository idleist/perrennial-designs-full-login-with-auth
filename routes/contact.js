const express = require("express");
const router = express.Router();

// Contact controller functions
const contactController = require("../controllers/contact_controller");

/*******************
 CONTACT ROUTES /contact
 *******************/

/***** GET /contact *****/

router.get("/", contactController.getContactPage);

/***** POST /contact/send *****/
// sends message via nodemailer
router.post("/send", contactController.postContactMessage);

module.exports = router;
