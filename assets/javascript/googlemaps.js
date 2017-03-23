
var geoLocateMapsAPI = "AIzaSyAu2voEOxFGHtqYtNUUIST0Zl-SdLBWLYY"

var baseURL = "https://www.googleapis.com/geolocation/v1/geolocate?key="

  var config = {
    apiKey: "AIzaSyDWjD9kZIz9VNzDOyOT5d9dG0d6cbRDozU",
    authDomain: "be-selekt.firebaseapp.com",
    databaseURL: "https://be-selekt.firebaseio.com",
    storageBucket: "be-selekt.appspot.com",
    messagingSenderId: "274079531363"
  };

  firebase.initializeApp(config);

 var dataRef = firebase.database();

function updateUserCords(email, latitude, longitude) {


  if (email === UID.email) {

    alert("test")

  } else {

        dataRef.ref().push({
        email: email,
        latitude: latitude,
        longitude: longitude

      });

    }

}




function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {

    zoom: 10

  });

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      
      var marker = new google.maps.Marker({
      	position: pos,
      	map: map
      })

      updateUserCords(localStorage.getItem("email"), pos.lat, pos.lng);


    }, function() {

      handleLocationError(true, infoWindow, map.getCenter());

    });

  } else {

    handleLocationError(false, infoWindow, map.getCenter());
    
    alert("This needs you to turn on instant location, so like do that please");
  }

}


