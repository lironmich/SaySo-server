var http = require("http");
var url = require("url");
var fs = require ("fs");
var path = require('path');
//var data = {};

http.createServer(function(request, response) {
	
	console.log("request.url; : " + request.url);
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './menu.html';
	if (filePath == './testui')
		filePath = './testui';
	
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
		
		var content = parsexmldb(db, menu); // parsexmldb parseEasyUI
		
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(content, 'utf-8')
		//console.log(content);
	}
	else if (filePath =='./testui'){
		var menu = fs.readFileSync('menu.html', "utf-8");
		var db =fs.readFileSync('db.xml', "utf-8");
		
		var content = parseEasyUI(db, menu); // parsexmldb parseEasyUI
		
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

function parseEasyUI (db, menu){
	var html = '   <div class="easyui-panel" style="padding:5px">	\n\
        <ul class="easyui-tree">	\n\
            <li>	\n\
                <span>My Documents</span>	\n\
                <ul>	\n\
                    <li data-options=\"state:\'closed\'\">	\n\
                        <span class="easyui-checkbox">Photos</span>	\n\
                        <ul>	\n\
                            <li>	\n\
                                <span>Friend</span>	\n\
                            </li>	\n\
                            <li>	\n\
                                <span>Wife</span>	\n\
                            </li>	\n\
                            <li>	\n\
                                <span>Company</span>	\n\
                            </li>	\n\
                        </ul>	\n\
                    </li>	\n\
                    <li>	\n\
                        <span>Program Files</span>	\n\
                        <ul>	\n\
                            <li>Intel</li>	\n\
                            <li>Java</li>	\n\
                            <li>Microsoft Office</li>	\n\
                            <li>Games</li>	\n\
                        </ul>	\n\
                    </li>	\n\
                    <li>index.html</li>	\n\
                    <li>about.html</li>	\n\
                    <li>welcome.html</li>	\n\
                </ul>	\n\
            </li>	\n\
        </ul>	\n\
    </div>	'
	parsed = menu.replace('<div id="tree"></div>', html);
	return (parsed);	
}

function parsexmldb(db, menu){
	
	var xmldoc = require('xmldoc');
	var treemenu = new xmldoc.XmlDocument(db);
	
	var	html =  '<div  id="menuTree" class="easyui-panel" style="padding:5px"  >\n'
		html += '<ul class="easyui-tree"><li>\n'
		html += '<span>' + treemenu.name + '</span>\n';
		
		//debugger;
		
		treemenu.eachChild(function(Curriculum){
			html += '<ul>\n <li data-options="state:\'open\'">\n  \
			<span class="easyui-checkbox">' + Curriculum.attr.name + '</span>\n';
			
			Curriculum.eachChild(function(Lesson){
				html += '<ul>\n <li data-options="state:\'closed\'">\n \
				<span class="easyui-checkbox">' + Lesson.attr.name + '</span>\n\n';
				
				Lesson.eachChild(function(flashcard){
					html += '<ul>\n <li data-options="state:\'closed\'">\n \
					<span class="easyui-checkbox">' + flashcard.attr.title + '</span><ul>\n';
					
					flashcard.eachChild(function(face){
						if (face.attr.previewDisplay == "true"){ 
							html += '		<li>' + face.attr.symbol + " : " + face.val + '</li>\n';
						} 
					});
					
					html += '</ul>\n</li>\n</ul>\n'; 
				});
				
				html += '</li>\n</ul>\n';
			});
			
			html += '</li>\n</ul>\n';
		});
		
		
	html += '</li>\n</ul>\n</div>\n';
	parsed = menu.replace('<div id="tree"></div>', html);
	return (parsed);	
};

/*<div style="margin:20px 0;">
        <a href="#" class="easyui-linkbutton" onclick="getChecked()">GetChecked</a> 
    </div>
    <div style="margin:10px 0">
        <input type="checkbox" checked onchange="$('#tt').tree({cascadeCheck:$(this).is(':checked')})">CascadeCheck 
        <input type="checkbox" onchange="$('#tt').tree({onlyLeafCheck:$(this).is(':checked')})">OnlyLeafCheck
    </div>
    <div class="easyui-panel" style="padding:5px">
        <ul id="tt" class="easyui-tree" data-options="url:'tree_data1.json',method:'get',animate:true,checkbox:true"></ul>
    </div>
    <script type="text/javascript">
        function getChecked(){
            var nodes = $('#tt').tree('getChecked');
            var s = '';
            for(var i=0; i<nodes.length; i++){
                if (s != '') s += ',';
                s += nodes[i].text;
            }
            alert(s);
        }*/

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