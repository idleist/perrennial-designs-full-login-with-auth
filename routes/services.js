const express = require("express");
const router = express.Router();

/*******************
 SERVICES ROUTE /services
 *******************/

/***** GET /services *****/
router.get("/", (req, res) => {
  res.render("services");
});

module.exports = router;
