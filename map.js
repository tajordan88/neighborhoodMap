// Create a map variable
var map;

// Create a new blank array for all the listing markers.
var markers = [];

// Locations. Add more here if you want more locations!
var locations = [
  {title: 'American University', location: {lat: 38.937352, lng: -77.088447}, category: 'Education'},
  {title: 'Georgetown University', location: {lat: 38.907567, lng: -77.072269}, category: 'Education'},
  {title: 'George Washington University', location: {lat: 38.899698, lng: -77.048567}, category: 'Education'},
  {title: 'The White House', location: {lat: 38.897591, lng: -77.036598}, category: 'Attraction'},
  {title: 'Lincoln Memorial', location: {lat: 38.889320, lng: -77.050089}, category: 'Attraction'},
];

// Function to initialize the map within the map div
function initMap() {
  // Props to https://snazzymaps.com/style/89310/vraplha for the map styling!
  var styles = [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#0e1626"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#25374b"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#283e55"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#25374b"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#2b455e"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3c7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#162832"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#1175ba"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0d5a8e"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#2b455e"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#162832"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#283c51"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.74135, lng: -73.99802},
    zoom: 14,
    styles: styles
  });

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();


  map.fitBounds(bounds);

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow hwich will open at the marker that is clicked, and populate based
  // on that markers position.
  function populateInfoWindow(marker, infowindow) {
    //Check to make sure the infowindow is not already opend on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if hte infowndiw is closed.
      infowindow.addListener('closeclick',function() {
        infowindow.setMarker(null);
      });
    }
  }




  // For Dropdown Menu
  var categoryFunc = function(titleHolder, categoryHolder) {
    var self = this;
    self.title = titleHolder;
    self.locCategory = ko.observable(categoryHolder);
  }


  // For setting a Location
  var Loc = function(data) {
    this.title = ko.observable(data.title);
    this.category = data.category;
  }


  // Here's my View Model
  var ViewModel = function(loc) {
    var self = this;

    // Non-editable locations data - coming from Locations Array at top of page.
    self.availableCategories = locations;

    // Locations
    self.categoryFunc = ko.observableArray([
      new categoryFunc("test", self.availableCategories[0])
    ]);


    // Generates list of locations
    this.locationList = ko.observableArray([]);

    locations.forEach(function(locItem){
      self.locationList.push( new Loc(locItem) );
    });

    this.currentLoc = ko.observable( this.locationList()[0] );

    this.viewLoc = function(clickedLoc) {
      self.currentLoc(clickedLoc);
    };

    this.myChosenCategory = ko.observable('Attraction');

    this.availableCategories = ko.observableArray(['All', 'Education', 'Attraction']);


    this.filter = ko.computed(function() {
      var myChosenCategory = self.myChosenCategory().toLowerCase();
      // console.log("self.myChosenCategory(): " + self.myChosenCategory());
      return ko.utils.arrayFilter(self.locationList(), function(location) {
        var category = location.category.toLowerCase();
        // console.log("category: " + category);
        // console.log("myChosenCategory: " + myChosenCategory);
        var hasCategory = (category === myChosenCategory) || (myChosenCategory === 'all'); // true or false
        // console.log("hasCategory: " + hasCategory);
        // console.log("location, myChosenCategory, hasCategory: " + location, myChosenCategory, hasCategory);
        return hasCategory; // true or false
      });
    });


    // The following group uses the location array to create an array of markers to initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Extend the boundaries of hte map for each marker.
      bounds.extend(marker.position);
      // Create an onlick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
    }



  };

  ko.applyBindings(new ViewModel()); // This makes Knockout get to work



}
