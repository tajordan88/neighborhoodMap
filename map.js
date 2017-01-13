// Create a map variable
var map;
// Function to initialize the map within the map div
function initMap() {
   var styles = [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#0e1626"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#25374b"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#283e55"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#25374b"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#2b455e"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3c7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#162832"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#1175ba"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0d5a8e"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#2b455e"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#162832"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#283c51"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}];


 map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 40.74135, lng: -73.99802},
   zoom: 14,
   styles: styles
 });
 // Create a single latLng literal object.
 var singleLatLng = {lat: 40.74135, lng: -73.99802};
 // TODO: Create a single marker appearing on initialize -
 // Create it with the position of the singleLatLng,
 // on the map, and give it your own title!
 // TODO: create a single infowindow, with your own content.
 // It must appear on the marker
 // TODO: create an EVENT LISTENER so that the infowindow opens when
 // the marker is clicked!
 var marker = new google.maps.Marker({
  position: singleLatLng,
  map: map,
  title: 'First Market'
 });
 var infowindow = new google.maps.InfoWindow({
  content: 'Dang Lamin Dang' + 'mah Lin'
 });
 marker.addListener('click', function() {
  infowindow.open(map, marker);
 });
}