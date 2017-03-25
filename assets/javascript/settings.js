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

 
    $('input[type=file]').change(function(){
 
        $(this).simpleUpload( {
 
            start: function(file){
                //upload started 
                $('#filename').html(file.name);
                $('#progress').html("");
                $('#progressBar').width(0);
            },
 
            progress: function(progress){
                //received progress 
                $('#progress').html("Progress: " + Math.round(progress) + "%");
                $('#progressBar').width(progress + "%");
            },
 
            success: function(data){
                //upload successful 
                $('#progress').html("Success!<br>Data: " + JSON.stringify(data));
            },
 
            error: function(error){
                //upload failed 
                $('#progress').html("Failure!<br>" + error.name + ": " + error.message);
            }
 
        });
 
    });
 


       var auth = firebase.auth();
        var storageRef = firebase.storage().ref();
      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + userId + '/' + file.name).put(file).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        // [START_EXCLUDE]
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      // [END oncomplete]
    

    // Create a reference to 'mountains.jpg'
        var profilePictureRef = storageRef.child(file.name);

// Create a reference to 'images/mountains.jpg'
        var profilePicture = storageRef.child('images/' + userId + '/' + file.name);

setTimeout(function(){
     location.reload(); }, 2000);


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






})

