var mongoose = require("mongoose");
var url = process.env.MONGOLAB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

var db = mongoose.connection;

var ProjectSchema = mongoose.Schema({
  imageSource: {
    type: String
  },
  imageAlt: {
    type: String
  },
  name: {
    type: String
  },
  desc: {
    type: String
  }
});

var Project = (module.exports = mongoose.model("Project", ProjectSchema));
