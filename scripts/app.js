// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");


  $.ajax({

    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess,
    error: onError


  })

});

function onSuccess(data) {

  $(data.features).each(function(i) {
    $('#info').append(`<p>M ${data.features[i].properties.mag}  -
                      ${getCity(data.features[i].properties.place)},
                      ${getTime(data.features[i].properties.time)} hours ago</p>`);

    console.log(data.features[0].properties.mag);
    var icons = {
      url: "earthquake.png",
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    }
    var coords = data.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: icons
    });
  });
}

function onError() {
  console.log('error');
}

var map;

function initMap(){
  var austin = {lat: 30.2682, lng: -97.74295};
  map = new google.maps.Map(document.getElementById('map'),{
    center: austin,
        zoom: 3

    });
}

function getTime(time){
  var timePassed = Date.now() - time;
  var hours = (((timePassed/1000)/60)/60);
  return Math.round(hours);

}

function getCity(location) {
  var cityArray = location.split(' ');

  cityArray.splice(0, 3);
  console.log(cityArray);
  return cityArray.join(' ');
}
