Router.configure({
  layoutTemplate: 'appLayout'
})

Router.route('/', {
  template: 'Home',
  waitOn: function() {
    return Meteor.subscribe('nearbyPlaces', Session.get('bottomLeft'), Session.get('topRight'))
  },
  data: function () { return Places.find() }
})
