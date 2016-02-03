var express = require('express'),
	path 	= require('path'),
	fs   	= require('fs'),
	uuid   	= require('node-uuid');

var app = express(),
	baseDeDatos = fs.readFileSync('./datos.json').toString();

var datos = JSON.parse(baseDeDatos);

app.use(express.static(path.join(__dirname, 'public')));

// Add POST, PUT, DELETE methods to the app
//app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.methodOverride());

// Pagina de Inicio: http:localhost:4000
app.get('/', function (req,res){
	res.sendfile(__dirname + '/index.html');
});



// Mostrar todos los toys
app.get('/toys', function(req,res) {
	res.send(datos);
});

// Mostrar el detalle de un toy
app.get('/toys/:id', function(req,res,next) {
	var dato;

	for ( var i=0; i<datos.length; i++ ) {
		var toy = datos[i];

		if (toy.id === req.params.id) {
			dato = toy;
		}
	}

	if (dato) {
		res.send(dato);
	} else {
		res.statusCode = 500;
		return res.send('No se encuentra el id.');
	}

});

// POST: crear un nuevo toy.
app.post('/toys', function (req, res){
	req.body.id = uuid.v1(4);

	datos.push(req.body);

	res.send(200, {id: req.body.id});
});

// PUT: Actualizar un toy.
app.put('/toys/:id', function (req, res){
	var toy;

	for (var i = datos.length - 1; i >= 0; i--) {
		toy = datos[i];

		if(toy.id === req.params.id){
			datos[i] = req.body;
		}
	}

	res.send(200);
});

// DELETE: Eliminar un toy.
app.delete('/toys/:id', function (req,res) {

	var elementoEliminar;

	for ( var i=0; i<datos.length; i++ ) {
		var toy = datos[i];

		if (toy.id === req.params.id) {
			elementoEliminar = i;
		}
	}

	datos.splice(elementoEliminar, 1);

	res.send(200);
	
});

app.listen(4000);
