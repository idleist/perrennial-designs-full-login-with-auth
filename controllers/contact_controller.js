// dotenv for sensitive email login details
const dotenv = require("dotenv");
dotenv.config();

// NodeMailer for the contact form
const nodemailer = require("nodemailer");

/*******************
 CONTACT CONTROLLERS
 *******************/

// render contact page
exports.getContactPage = (req, res, next) => {
  res.render("contact", {
    // isLoggedIn Session
    // isLoggedIn: req.session.isLoggedIn
  });
};

// uses nodemailer to post message to admin and response email to the client
exports.postContactMessage = (req, res, next) => {
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
};
