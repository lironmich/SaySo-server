var path = require('path');
var fs = require ("fs");
var dbAPI = require('./dbAPI');

function menuHandler(response){
	var menu = fs.readFileSync('menu.html', "utf-8");
	var dbsource =fs.readFileSync('db.json', "utf-8");
	
	var content = dbAPI.parseJSONdb(dbsource, menu);
	console.log("content : \n" + content.toString());
	response.writeHead(200, { 'Content-Type':  'text/html' });
	response.end(content, 'utf-8');
}

function xmldbHandler(response){
	var menu = fs.readFileSync('menu.html', "utf-8");
	var dbsource =fs.readFileSync('db.xml', "utf-8");
	var content = dbAPI.parsexmldb(dbsource, menu);
	
	response.writeHead(200, { 'Content-Type':  'text/html' });
	response.end(content, 'utf-8');
}

function defaultHandler(response, filePath){
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

exports.defaultHandler = defaultHandler;
exports.menuHandler = menuHandler;
exports.xmldbHandler = xmldbHandler;