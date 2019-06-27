const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// NodeMailer for our contact form
const nodemailer = require("nodemailer");

// Contact Page Route - GET and POST route using nodemailer
router.get("/", function(req, res) {
  res.render("contact");
});

router.post("/send", function(req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  var mailOptions = {
    from: `Ben <${process.env.EMAIL_USER}>`,
    to: `${req.body.email}`,
    subject: "Website Submission",
    text:
      "you have submitted a message... Name:" +
      req.body.name +
      "Email: " +
      req.body.email +
      "Message: " +
      req.body.message,
    html: `<p>you have submitted a message...</p><br>
             <p>Name: ${req.body.name}</p><br>
             <p>Email: ${req.body.email}</p><br>
             <p>Message: ${req.body.message}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email Sent" + info.response);
      res.redirect("/");
    }
  });
});

module.exports = router;
