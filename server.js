var http = require("http");
var url = require("url");

function start(route, handle){
	http.createServer(function(request, response) {
		var pathname = '.' + request.url;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response);
	}).listen(8888);
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