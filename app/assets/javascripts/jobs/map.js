$(document).ready(function(){
  if ($('#job-map').length){
    var geocoder = new google.maps.Geocoder();
    var address = $('#job-map').attr('data-address');
    console.log(address);
    geocoder.geocode({"address": address}, function(results, status){
      if(status == "OK"){
        var map = new google.maps.Map(document.getElementById('job-map'), {
          center: results[0].geometry.location,
          zoom: 8
        });
      } else {
        console.log("Map unavailable. Either City/State combo is bad or the GoogleMaps Api is experiencing difficulties.");
      }
    });
  }

});