var fs = require('fs');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));


app.get('/events', function(req, res){
	return res.send(fs.readFileSync('./build/events/index.html', 'utf8'));
});


app.get('*', function(req, res){
	return res.send(fs.readFileSync('./build/boldlygo/index.html', 'utf8'));
});


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);