var path = require('path');
var fs = require ("fs");
var dbAPI = require('./dbAPI');
var prettyjson = require('prettyjson');


function cardHandler(response, parsedURL ){
	
	var content ="";
	var card = fs.readFileSync('record.html', "utf-8");
	
	console.log("\n\parsedURL : " + prettyjson.render(parsedURL));
	
	cardID = parsedURL["id"]|| 114; 
	cardFace = parsedURL["face"] || 0;
	
	data = dbAPI.JSONGet(cardID, cardFace); // make callback to response 
	content = evalCard(card, data, cardID, cardFace);
	
	response.writeHead(200, { 'Content-Type':  'text/html' });
	response.end(content, 'utf-8');
}

function evalCard(card, data, cardID, cardFace){
	content = card.replace('<div id="textBody">', '<p id = "textBody">' + data["faceText"]);
	content = content.replace('<div id="faceSymbol">??', '<div id="faceSymbol">'+  data["faceSymbol"]);
	
	content = content.replace('faceright=\'---\'','faceright=\'./card?id=' + cardID + '&face=' + (parseInt(cardFace) + 1).toString() +'\'');
	content = content.replace('faceleft=\'---\'', 'faceleft=\'./card?id=' + cardID + '&face=' + (parseInt(cardFace) - 1).toString()+'\'');
	content = content.replace('stringNext = \'---\'', 'stringNext=\'./card?id=' + (parseInt(cardID)+1).toString() + '&face=' + "0\'");
	return content
	
}

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
exports.cardHandler = cardHandler;