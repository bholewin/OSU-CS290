//Bryce Holewinski
//CS290
/*
  A lot of the below code is copied from the lectures on Express and handlebars
*/

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// the below is used for posts
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//GET portion, based on the form handling lectures
app.get('/home', function(req, res) {
  var spec = [];
	for (var i in req.query) {
		spec.push({'name': i, 'value': req.query[i]})
	}
	var context = {};
	context.dataList = spec;
	context.isGet = true; //added for the if statements in the home.handlebars
	res.render('home', context);
});

//POST portion, based on the form handling lectures
app.post('/home', function(req, res){
	var spec = [];
	for (var i in req.body){
		spec.push({'name': i,'value':req.body[i]})
	}
	var context = {};
	context.dataList = spec;
	context.isPost = true; //added for the if statements in the home.handlebars
	res.render('home', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Post/Get Checker started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

});
