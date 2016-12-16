var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  gitLink: String,
  releaseDate: String

});



var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
