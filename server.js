// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below

  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/projects", description: "gits all projects"}, // CHANGE ME
      {method: "GET", path: "/api/projects/:id", description: "gits one projects"}, // CHANGE ME
      {method: "POST", path: "/api/projects", description: "gits all projects"}, // CHANGE ME
      {method: "PUT", path: "/api/projects/:id", description: "gits all projects"}, // CHANGE ME
      {method: "DELETE", path: "/api/projects/:id", description: "gits all projects"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function (req, res) {
  // TODO: Document all your api endpoints below
  res.json({
  name: "Ricado Arellano",
  githubUsername: "ricarellano",
  githubLink: "https://github.com/ricarellano",
  githubProfileImage: "https://avatars0.githubusercontent.com/u/20728970?v=3&s=460",
  currentCity: "San Francisco"
})
});

app.get('/api/projects', function (req, res) {
  // send all books as JSON response
  db.Project.find({}, function(err, allProjects) {
      res.json({ projects: allProjects });
    });
  });

app.get('/api/projects/:id', function (req, res) {
  db.Project.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

app.post('/api/projects', function (req, res) {
  // create new book with form data (`req.body`)
  var newProject = new db.Project({
    title: req.body.title,
    gitLink: req.body.gitLink,
    releaseDate: req.body.releaseDate
    });
    newProject.save(function(err, savedProject) {
     res.json(savedProject);
   });
  });

  app.put('/api/projects/:id', function(req, res) {
    // get todo id from url params (`req.params`)
    var projectId = req.params.id;

    // find todo in db by id
    db.Project.findOne({ _id: projectId }, function(err, foundProject) {
      // update the todos's attributes
      foundProject.name = req.body.name;


      // save updated todo in db
      foundTodo.save(function(err, savedProject) {
        res.json(savedProject);
      });
    });
    });

    app.delete('/api/projects/:id', function(req, res) {
        // get todo id from url params (`req.params`)
        var projectId = req.params.id;

        // find todo in db by id and remove
        db.Project.findOneAndRemove({ _id: projectId }, function(err, deletedProject) {
          res.json(deletedProject);
        });
      });

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
