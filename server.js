/*
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8888, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
*/

var http = require("http");
var url = require("url");


function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = '.' + request.url;
		console.log("Request for " + pathname + " received.");
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;



// need to:


// get methodes SOUP
// =============
// on relevant request - send full list of Curriculum's
// on relevant request with Curriculum's ID - send list of lessons
// on relevant request with lessons ID - send list of records

// for start - save list of records and supply random one to user

// set methodes
// =============
// Make web page to produce new Curriculum/ lessons/ records