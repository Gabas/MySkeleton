// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// configuration ===========================================

// set our port
var port = process.env.PORT || 5000; 

// connect to our mongoDB database 
var db = require('./config/db');
mongoose.connect(db.url); 
var Nerd = require('./app/models/nerd');

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 


// ROUTES ==================================================
//require('./app/routes')(app); // configure our routes
var router = express.Router();

//middleware for all requests
router.use(function(req, res, next) {
	console.log('Something happening.');
	next();
});


router.route('/nerds')
	
	.post(function(req,res) {
		var nerd = new Nerd();
		nerd.name = req.body.name;
		
		nerd.save(function(err) {
			if (err) 
				res.send(err);
			res.json({ message : 'Bear created!' });
		});
	})

	.get(function(req,res) {
		Nerd.find(function(err, bears) {
			if (err)
				res.send(err);
			res.json(bears)
		});
	});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


app.use('/api', router);

app.get('*', function(req, res) {
	res.sendfile('./public/views/index.html');
});




// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               
console.log('Magic happens on port ' + port);
// expose app         
exports = module.exports = app;       