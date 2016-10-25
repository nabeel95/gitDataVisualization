
var http = require('http');
var controller = require('./lib/controller');

var PORT = 4000;

var server = http.createServer(function(req,res){
	return controller(req,res);
});

console.log("listning at port ", PORT);
server.listen(PORT);
