$(document).ready(function() {

var database = firebase.database();


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
            
    var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            var name = snapshot.val().name;
            var email = snapshot.val().email;
            var agency = snapshot.val().agency;
            var address = snapshot.val().address;
            var jobTitle = snapshot.val().jobTitle;
            var phone = snapshot.val().phone;
            var facebook = snapshot.val().facebookURL;
            var instagram = snapshot.val().instagramURL;
            var linkedIn = snapshot.val().linkedInURL;

            $('#profileName').append(name);
            $('#profileAgency').append(agency);
            $('#profileAddress').append(address);
            $('#profileJobTitle').append(jobTitle);
            $('#profilePhone').append(phone);
            $('#profileEmail').append(email);
            
               
        }); 
             
    } else {
        return false;
    }
 });





$('#settingsSubmit').on('click', function writeUserData() {
  event.preventDefault();

var name = $('#name').val().trim(); 
var email = $('#email').val().trim();
var agency = $('#agency').val().trim();
var address = $('#address').val().trim();
var jobTitle = $('#jobTitle').val().trim();
var phone = $('#phone').val().trim();
var facebookURL = $('#facebook').val().trim();
var instagramURL = $('#instagram').val().trim();
var linkedInURL = $('#linkedIn').val().trim();

// var profile_picture = $('#inputFile')


  var userId = firebase.auth().currentUser.uid;

  firebase.database().ref('users/' + userId).set({
    userId: userId,
    name: name,
    email: email,
    agency: agency,
    address: address,
    jobTitle: jobTitle,
    phone: phone,
    facebookURL: facebookURL,
    instagramURL: instagramURL,
    linkedInURL: linkedInURL,
    // profilePicture : imageUrl
  });
})






})

