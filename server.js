var http = require("http");
var url = require("url");
var fs = require ("fs");
var path = require('path');
//var data = {};

http.createServer(function(request, response) {
	var xml = loadDB(); // change to "eval html"
	// response.writeHead(200, {"Content-Type": "text/html"});
	// response.write(body);
	debugger;
	//menuShow(response);
	console.log("request.url; : " + request.url);
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './menu.html';
	
	fileShow(response, filePath);
}).listen(8888);


function fileShow(response, filePath){	
	var extname = path.extname(filePath);
	
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	console.log( "filePath : " + filePath);
	
	fs.readFile(filePath, function(error, content) {
		if (error) {
			console.log("error: " + error);
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8')
		}
	});
}



function loadDB(source){
	source = source || "db2.xml";
	var fs = require ('fs'), xml2js = require ('xml2js'); 
	var json;
	var db = fs.readFileSync(source, "utf-8");
	return db;
}


/*
// move both to be called from dispatcher
function fileShow(response, file){
	fs.readFile(file, function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			//process html
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});
}
*/

	

// need to:

// never show / load empty nodes!

// get methodes
// =============
// on relevant request - send full list of Curriculum's
// on relevant request with Curriculum's ID - send list of lessons
// on relevant request with lessons ID - send list of records

// for start - save list of records and supply random one to user

// set methodes
// =============
// Make web page to produce new Curriculum/ lessons/ records