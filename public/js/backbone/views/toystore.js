var app = app || {};

app.ToyStore = Backbone.View.extend({
	el: '#app',

	events: {
		'click #crear': 'crearToy'
	},

	initialize: function() {
		this.listenTo(app.toys, 'add', this.mostrarToy);
		this.listenTo(app.toys, 'remove', this.resetToy);
		app.toys.fetch();
	},

	mostrarToy: function(modelo){
		var vista = new app.MostrarToyView({model: modelo});
		$('.toys').append(vista.render().$el);
	},

	crearToy: function(){
		app.toys.create({
			"titulo": $('#inputTitulo').val(),
			"comentario": $('#inputComentario').val(),
			"categoria": $('#inputCategoria').val()
		});

	},

	resetToy: function(){
		this.$('.toys').html('');
		app.toys.each(this.mostrarToy, this);

		
	}
});

app.MostrarToyView = Backbone.View.extend({
	template: _.template($('#tplMostrarToy').html()),
	tagName: 'li',
	className: 'list-group-item',

	events:{
		'click #detalle': 'mostrarDetalle',
		'click #eliminar': 'eliminarToy'
	},

	initialize: function() {
		var self = this;
		
		app.route.on('route:book', function(){
			self.render();
		});
		app.route.on('route:detalle', function(){
			self.render();
		});
	},

	render: function() {
		var self = this;
		if(window.stade === "toy"){
			$('.detalle').hide();
			$('#myModal').modal('hide');
			this.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.stade === "detalle"){
			$('.detalle').show();
			if(this.model.get('id') === window.toyID){
				new app.DetalleToyView({model:this.model});
			}
		}
		return this;
	},

	mostrarDetalle: function() {
		Backbone.history.navigate('toys/' + this.model.get('id'), {trigger: true});
	},

	eliminarToy: function(){
		this.model.destroy();
	}
});


app.DetalleToyView = Backbone.View.extend({
	el: '.detalle',
	template: _.template($('#tplDetalleToy').html()),	

	events: {
		'click .atrasToys': 'atrasToys'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		$('#myModal').modal();
	},

	atrasToys: function(){
		Backbone.history.navigate('', {trigger: true});	

	}
});