var http = require("http");
var url = require("url");
var fs = require ("fs");
var path = require('path');
var $ = require('jquery');
//var data = {};

http.createServer(function(request, response) {
	
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
	
	
	if (filePath =='./menu.html'){	
		var menu = fs.readFileSync('menu.html', "utf-8");
		var db =fs.readFileSync('db.xml', "utf-8");
		
		var content = parsexmldb(db, menu);
		
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(content, 'utf-8')
		//console.log(content);
	}
	else{
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
}

function parsexmldb(db, menu){
	
	var xmldoc = require('xmldoc');
	var treemenu = new xmldoc.XmlDocument(db);
	console.log("parsing xml pdb");
	
	var	html =  '<div id="menuTree" style="padding:5px">\n'
		html += '<ul>\n'; 
		html += '<span>' + treemenu.name + '</span>\n';
		
		//debugger;
		treemenu.eachChild(function(Curriculum){
			html += '<ul> <li  <span>' + Curriculum.attr.name + '</span>\n';
			Curriculum.eachChild(function(Lesson){
				html += '	<ul> <li> <span>' + Lesson.attr.name + '</span>\n';
				Lesson.eachChild(function(flashcard){
					html += '		<ul> <li> <span>' + flashcard.attr.title + '</span><ul>\n';
					flashcard.eachChild(function(face){
						console.log(face.attr.fieldSymbol);
						if (face.attr.previewDisplay == "true"){ 
							html += '			<li><span>' + face.attr.symbol + " : " + face.val + '</span></li>\n';
						} 
					});
					html += '			</ul></li></ul>  '; 
				});
				html += '		</li></ul>\n';
			});
			html += '	</li></ul>\n';
		});
		
	html += '</ul></div>\n';
	parsed = menu.replace('<div id="tree"></div>', html);
	return (parsed);	
};

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