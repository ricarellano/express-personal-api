// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_project =
  {
    title: "Airplane Crash",
    gitLink: "https://github.com/ricarellano/airplane-crash",
    releaseDate: "december 12, 2016"
  }


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

db.Project.create(new_project, function(err, project){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new project", project._id)
  process.exit(); // we're all done! Exit the program.
})
