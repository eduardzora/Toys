var app = app || {};

var ruta = Backbone.Router.extend({
	routes: {
		'': 'book',
		'toys/:id': 'detalle'
	},

	book: function(){
		window.stade = "toy";
	},

	detalle: function(id){
		window.stade = "detalle";
		window.toyID = id;
	}
});

app.route = new ruta();
