$(document).ready(function() {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWjD9kZIz9VNzDOyOT5d9dG0d6cbRDozU",
    authDomain: "be-selekt.firebaseapp.com",
    databaseURL: "https://be-selekt.firebaseio.com",
    storageBucket: "be-selekt.appspot.com",
    messagingSenderId: "274079531363"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


var global_username = '';


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

})