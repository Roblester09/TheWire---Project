$(document).ready(function() {

var name = 
var email = 
var agency =
var address = 


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}



})

