Meteor.startup(function() {
  navigator.geolocation.getCurrentPosition(success);
});

success = function(position) {
  Session.set('location', position);
  debugger
  Meteor.call('fetchNearbyLocations', position.coords)
}
