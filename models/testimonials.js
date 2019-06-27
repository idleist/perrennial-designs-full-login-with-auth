var mongoose = require("mongoose");
var url = process.env.MONGOLAB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

var db = mongoose.connection;

var TestimonialSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  message: {
    type: String
  }
});

var Testimonial = (module.exports = mongoose.model(
  "Testimonial",
  TestimonialSchema
));
