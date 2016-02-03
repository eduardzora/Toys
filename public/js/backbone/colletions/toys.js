var app = app || {};

var ToysCollection = Backbone.Collection.extend({
	model: app.Toy,
	url: '/toys'
});

app.toys = new ToysCollection();