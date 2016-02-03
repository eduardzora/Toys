var app = app || {};

app.Toy = Backbone.Model.extend({

	urlRoot: 'toys/',


	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	},

	validate: function(atributos) {
		if(!atributos.titulo) {
			return 'Debe tener un titulo.';
		}
	}

});

