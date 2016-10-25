var path = require('path');
var express = require('express');
var app = express();


app.get('/',function(req, res){
	console.log(req.path)
	var fileName = path.join(__dirname,'../public/html/index.html');
	res.sendFile(fileName);
});

app.get('/data', function(req, res) {
	console.log(req.path);
	res.send(JSON.stringify({"Ruby": {"issues": 10}, "Java": {"issues": 10}}));
})
app.use(express.static('./public'));

module.exports = function(req, res) {
	app(req, res);
}