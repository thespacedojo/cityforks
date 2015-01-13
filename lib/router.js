Router.configure({
  layoutTemplate: 'appLayout'
})

Router.route('/', function() {
  this.render('Home', {
    data: function() {return true}
  })
})
