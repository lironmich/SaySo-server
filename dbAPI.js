
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

function parseJSONdb(db, menu){
	
	console.log("parseJSONdb \n\n\n" + db.toString());
	
	var html = '<div style="margin:20px 0;"> ' 
	html += '<a href="#" class="easyui-linkbutton" onclick="getChecked()">GetChecked</a> ' 
	html += '</div> ' 
	html += '<div style="margin:10px 0"> ' 
	html += '<input type="checkbox" checked onchange="$(\'#tt\').tree({cascadeCheck:$(this).is(\':checked\')})">CascadeCheck '
	html += '<input type="checkbox" onchange="$(\'#tt\').tree({onlyLeafCheck:$(this).is(\':checked\')})">OnlyLeafCheck '  
	html += '</div>'  
	html += '<div class="easyui-panel" style="padding:5px"> '  
	html += '<ul id="tt" class="easyui-tree" data-options="url:\'db.json\',method:\'get\',animate:true,checkbox:true"></ul> ' 
	html += '</div> '
	
	html += ' <script type="text/javascript"> '
    html += '     function getChecked(){ '
    html += '         var nodes = $(\'#tt\').tree(\'getChecked\'); '
    html += '         var s = ""; '
    html += '         for(var i=0; i<nodes.length; i++){ '
    html += '             if (s != "") s += ","; '
    html += '             s += nodes[i].text; '
    html += '         } '
    html += '         alert(s); '
    html += '     } '
    html += ' </script> '
	
	parsed = menu.replace('<div id="tree"></div>', html);
	return (parsed);	
};

exports.parseJSONdb = parseJSONdb;
exports.parsexmldb = parsexmldb;


