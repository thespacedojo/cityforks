Template.home.rendered = function() {
  Tracker.autorun(function() {
    if (Session.get('location')) {
      latitude = Session.get('location').coords.latitude;
      longitude = Session.get('location').coords.longitude;
      var map = L.map('map').setView([latitude, longitude], 15);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      bounds = map.getBounds();
      if (bounds) {
        Session.set('bottomLeft', [bounds._southWest.lng, bounds._southWest.lat]);
        Session.set('topRight', [bounds._northEast.lng, bounds._northEast.lat]);
      }
      if (Template.instance().data) {
        Template.instance().data.forEach(function(place) {
          L.marker([place.geometry.location.lat, place.geometry.location.lng]).addTo(map)
            .bindPopup("<strong>" + place.name + "</strong><br />" + place.vicinity);
        });
      }
      map.on('moveend', function(event) {
        bounds = event.target.getBounds()
        Session.set('bottomLeft', [bounds._southWest.lng, bounds._southWest.lat]);
        Session.set('topRight', [bounds._northEast.lng, bounds._northEast.lat]);
        coords = {latitude: event.target.getCenter().lat, longitude: event.target.getCenter().lng}
        Session.set('location', {coords: coords})
        Meteor.call('fetchNearbyLocations', coords)
      });
    }
  });
}
