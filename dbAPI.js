
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

exports.parsexmldb = parsexmldb;

/*
<div style="margin:20px 0;">
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
	}
</script>
*/