var Testimonial = require("../models/testimonials");

exports.testimonial_create = (req, res) => {
  var name = req.body.name;
  var message = req.body.message;

  var newTestimonial = new Testimonial({
    name: name,
    message: message
  });

  newTestimonial.save(function(err) {
    if (err) throw err;
  });

  res.redirect("/");
};

exports.testimonial_delete = (req, res) => {
  var id = req.params.testimonialid;
  Testimonial.findByIdAndDelete(id, function(err, id) {
    if (err) {
      console.log(err);
    }
    console.log(id + "deleted");
    res.redirect("/admin");
  });
};
