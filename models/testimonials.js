const mongoose = require("mongoose");

const TestimonialSchema = mongoose.Schema({
  name: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = Testimonial = mongoose.model("Testimonial", TestimonialSchema);
