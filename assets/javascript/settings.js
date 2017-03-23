$(document).ready(function() {

var name = $('#name').val().trim(); 
var email = $('#email').val().trim();
var agency = $('#agency').val().trim();
var jobTitle = $('#jobTitle').val().trim();
var phone = $('#phone').val().trim();
var websiteURL = $('#website').val().trim();
var facebookURL = $('#facebook').val().trim();
var instagramURL = $('#instagram').val().trim();
var linkedInURL = $('#linkedin').val().trim();
var profile_picture = $('#')

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    lastName: lastName,
    email: email,
    agency: agency,
    jobTitle: jobTitle,
    phone: phone,
    websiteURL: websiteURL,
    facebookURL: facebookURL,
    instagramURL: instagramURL,
    linkedInURL: linkedInURL,
    profile_picture : imageUrl
  });
}



})

