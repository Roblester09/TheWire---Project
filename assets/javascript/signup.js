$(document).ready(function() {



  var database = firebase.database();


   firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           $('.signed-in').hide();
        } else {
            
        }
    });

$('#createAccount').on('click', function(){
var email = $('#userEmail').val().trim();
var password = $('#userPassword').val();

	console.log(email);
	console.log(password);

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorMessage);
  console.log(errorCode);
  // ...
});

})

$('#account-login').on('click', function(){
	var email = $("#loginEmail").val().trim();
	var password = $('#loginPassword').val();

	console.log(email);
	console.log(password);

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode);
  console.log(errorMessage);


  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location = 'landing.html';
        } else {
            
        }
    });
  // ...
});

})

})