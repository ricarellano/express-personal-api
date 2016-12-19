console.log("Sanity Check: JS is working!");
var template;
var $projectsList
$(document).ready(function(){
$projectsList = $('#newProject');
// your code
var source = $('#profile-template').html();
template = Handlebars.compile(source);

var source2 = $('#projects-template').html();
template2 = Handlebars.compile(source2);


  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: profileSuccess,
    error: handleError
  });

  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: projectsSuccess,
    error: handleError
  });

  $('#newProjectForm').on('submit', function(e) {
      e.preventDefault();
      console.log('new project serialized', $(this).serializeArray());
      $.ajax({
        method: 'POST',
        url: '/api/projects',
        data: $(this).serializeArray(),
        success: newProjectSuccess,
        error: newProjectError
      });
    });

    $projectsList.on('click', '.deleteBtn', function(event) {
      console.log($(this).attr('data-id'));
  console.log('clicked delete button to', '/api/projects/'+$(this).attr('data-id'));
  $.ajax({
    method: 'DELETE',
    url: '/api/projects/'+$(this).attr('data-id'),
    success: deleteProjectSuccess,
    error: deleteProjectError
  });
});

function profileSuccess(profileObject) {
  myProfile = profileObject;
  var headerHtml = template({name: myProfile.name,
    githubProfileImage: myProfile.githubProfileImage
    });
  $("#profileInfo").append(headerHtml);
}


function projectsSuccess(projectsObject) {
  console.log(projectsObject)
  myProjects = projectsObject.projects;
  myProjects.forEach(function(project){
    var projectsHtml = template2({title: project.title, gitLink:project.gitLink, id: project._id});
    $("#newProject").append(projectsHtml);
  });
}

function reRender(){
  $("#newProject").empty();
  myProjects.forEach(function(project){
    var projectsHtml = template2({title: project.title, gitLink:project.gitLink, id: project._id});
    $("#newProject").append(projectsHtml);
  });
}

function handleError(e) {
  console.log('uh oh');
  $('#profile').text('Failed to load projects, is the server working?');
}

function newProjectSuccess(projectsObject) {
  $('#newProjectForm input').val('');
  myProjects.push(projectsObject);
  reRender();
}

function newProjectError() {
  console.log('newproject error!');
}

function deleteProjectSuccess(deleteProject) {
  var project = deleteProject;
  console.log(deleteProject);
  var projectId = deleteProject._id;
  console.log('delete project', projectId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < myProjects.length; index++) {
    if(myProjects[index]._id === projectId) {
      myProjects.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  reRender();

}

function deleteProjectError() {
  console.log('deleteproject error!');
}
//
// function initMap() {
//   // Create a map object and specify the DOM element for display.
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     scrollwheel: false,
//     zoom: 8
//   });
// }
//
// initMap();








});
