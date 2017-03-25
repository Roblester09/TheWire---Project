$(document).ready(function() {

var database = firebase.database();
var selectefFile;


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

// $('#file').on('change', function(){
//     var selectefFile = event.target.files[0];
// });

// $('#uploadFiles').on('click', function(){

//     var userId = user.uid
//     var storageRef = firebase.storage().ref('/' + userId + '/' + fileName);
//     var fileName = selectefFile.name;
//     var uploadTask = storageRef.put(selectefFile);

//         // Register three observers:
//     // 1. 'state_changed' observer, called any time the state changes
//     // 2. Error observer, called on failure
//     // 3. Completion observer, called on successful completion
//     uploadTask.on('state_changed', function(snapshot){
//       // Observe state change events such as progress, pause, and resume
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           console.log('Upload is paused');
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           console.log('Upload is running');
//           break;
//       }
//     }, function(error) {
//       // Handle unsuccessful uploads
//     }, function() {
//       // Handle successful uploads on complete
//       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//       var downloadURL = uploadTask.snapshot.downloadURL;
//       console.log(downloadURL);
//     });

// })

 

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
  });
})

$( function() {
    $( "#draggable" ).draggable();
  } );




})

