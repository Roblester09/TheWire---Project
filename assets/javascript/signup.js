$(document).ready(function() {



  var database = firebase.database();



var email = $('#userEmail').val().trim();
var password = $('#userPassword').val();

$('#createAccount').on('click', function(){
var email = $('#userEmail').val().trim();
var password = $('#userPassword').val();

	console.log(email);
	console.log(password);

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

})

})