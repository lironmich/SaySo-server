var path = require('path');
var fs = require ("fs");
var dbAPI = require('./dbAPI');
var prettyjson = require('prettyjson');
var request = require("request");

function cardHandler(response, cardID, cardFace ){
	
	var content ="";
	var card = fs.readFileSync('views/record.html', "utf-8");
	
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
	content = content.replace('stringNext = \'---\'', 'stringNext=\'./card?id=' + (parseInt(cardID)+1).toString() + '&face=0\'');
	return content
}

function menuHandler(response){	
	var menu = fs.readFileSync('views/menu.html');
	var content = parseJSONdb(menu);
			
	response.writeHead(200, { 'Content-Type':  'text/html' });
	response.end(content, 'utf-8'); 	
}

function parseJSONdb(menu){
	
	// console.log("\n\n\nparseJSONdb ");
	
	var html = '<div style="margin:20px 0;"> \n' 
	html += '<a href="#" class="easyui-linkbutton" onclick="getChecked()">GetChecked</a> \n' 
	html += '</div> \n' 
	html += '<div style="margin:10px 0"> \n' 

	html += '<input type="checkbox"  checked onchange="$(\'#tt\').tree({cascadeCheck:$(this).is(\':checked\')})">CascadeCheck '
	html += '<input type="checkbox" onchange="$(\'#tt\').tree({onlyLeafCheck:$(this).is(\':checked\')})">OnlyLeafCheck '  
	html += '</div>\n'
	html += '<form method="post" id="tree" >\n'	
	html += '<div class="easyui-panel" style="padding:5px"> \n'  
	html += '<ul id="tt" class="easyui-tree" data-options="url:\'db.json\',method:\'get\',animate:true,checkbox:true"></ul> \n' 
	html += '</div> \n'
	html += ' </form>\n'
	html += ' <div id="submit"> Submit </div> '
	html += ' <script type="text/javascript"> \n'

	html += ' $( "#submit" ).click(function() { \n'
	html += ' console.log("submit clicked"); \n'
	html += '   $("#tree").append(\'<input type="hidden" name="ids" value=\' + getChecked() + \' />\'); \n'
	html += '   $( "#tree" ).submit();  \n'
	html += ' });  \n'
    html += '     function getChecked(){ \n'
    html += '         var nodes = $(\'#tt\').tree(\'getChecked\'); \n'
    html += '         var s = []; \n'
    html += '         for(var i=0; i<nodes.length; i++){ \n'
    html += '             s[s.length] = nodes[i].id; \n'
    html += '         } \n'
	html += '         // window.location.href = "./card?id=" + s[Math.floor(Math.random()*s.length)] +"&face=0" \n';
    html += '         return s.toString();'
	html += '     } \n '
    html += ' </script> \n'
	
	var parsed = menu.toString().replace('<div id="tree"></div>', html);
	
	// console.log(parsed);
	return (parsed);	
};

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
exports.cardHandler = cardHandler;