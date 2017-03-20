$(document).ready(function() {



  var database = firebase.database();

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

$('#account-login').on('click', function(){
	var email = $("#loginEmail").val().trim();
	var password = $('#loginPassword').val();

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

})

})