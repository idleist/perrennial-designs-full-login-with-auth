const bcrypt = require("bcryptjs");
const User = require("../models/users");

/*******************
 AUTH CONTROLLERS
 *******************/

// renders login page - if logged in redirects to admin page
exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  if (!req.session.isLoggedIn) {
    // Determines if we have an error message present. Without this there would constantly be a border
    // in place on the screen expecting a message.
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    return res.render("auth/login", {
      errorMessage: message
    });
  }
  res.redirect("/admin");
};

// login validation - password check with bcrypt - redirects to home page on success

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/pd-admin");
      }
      bcrypt
        .compare(password, user.password)
        // IMPORTANT with bcrypt even if passwords dont match- still enters then block
        .then(match => {
          if (match) {
            // creates a session cookie stored in MongoDB store
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid Email or Password");
          res.redirect("/pd-admin");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/pd-admin");
        });
    })
    .catch(err => {
      console.log(err);
    });
};

// Destroys the session cookie from MongoDB store
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    console.log("session destroyed");
    res.redirect("/");
  });
};

// creates new administrator and stores details to DB
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Checks if an email already exists in the DB
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log("Email already exists");
        req.flash("error", "Email already exists");
        return res.redirect("/pd-admin");
      }
      // Hashes password for secure storage in the DB
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          console.log(hashedPassword);
          const user = new User({
            email: email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/admin");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
