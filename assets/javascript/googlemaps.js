
var geoLocateMapsAPI = "AIzaSyAu2voEOxFGHtqYtNUUIST0Zl-SdLBWLYY"

var baseURL = "https://www.googleapis.com/geolocation/v1/geolocate?key="

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

    }, function() {

      handleLocationError(true, infoWindow, map.getCenter());

    });

  } else {

    handleLocationError(false, infoWindow, map.getCenter());
    
    alert("This needs you to turn on instant location, so like do that please");
  }

}
