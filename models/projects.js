const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
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

module.exports = Project = mongoose.model("Project", ProjectSchema);
