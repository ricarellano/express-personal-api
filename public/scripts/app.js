console.log("Sanity Check: JS is working!");

var $profile;

$(document).ready(function(){

// your code
$profile = $('#profile');

var source = $('#profile-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });


function render(){
  var headerHtml = template({name: myProfile.name,
    githubProfileImage: myProfile.githubProfileImage

    });
    $("#profile").append(headerHtml);

}

function handleSuccess(json) {
  console.log(json);
  myProfile = json;
  render();

}

function handleError(e) {
  console.log('uh oh');
  $('#profile').text('Failed to load books, is the server working?');
}










});
