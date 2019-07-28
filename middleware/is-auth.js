/***** Middleware - Checks if user is logged in (for protecting admin route) *****/

module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};
