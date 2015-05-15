var mongoose = require('mongoose');
var fs = require ("fs"); // remove me
var jsondb=""; // remove me
var prettyjson = require('prettyjson');

function mongoInit(){
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  console.log("mongo connection open");
	  
	  
	  
	});
}

function JSONGet(cardID, cardFace){
	if (jsondb===""){
		InitJSONDB();
	}
	var id = parseInt(cardID);
	var facenum = parseInt(cardFace);
	
	console.log("JSONGet : " + cardID + " : " + cardFace);
	record = getObjects(jsondb, 'id', id);
	face = getObjects(record, 'ordernum', cardFace);
	console.log("face" + face[0]["value"] + ' : ' + face[0]["symbol"]);
	var data={};
	if (face.length > 0){
		data["faceText"] = face[0]["value"];
		data["faceSymbol"] = face[0]["symbol"] ;
	}
	else {
		data["faceText"] =  "out of boundary";
		data["faceSymbol"] =  "OOB";
	}
	console.log("JSONGet : data[faceText]" + 	data["faceText"] +	"data[faceSymbol] : " + data["faceSymbol"] );
	
	return data;
}

function InitJSONDB(){ 
	var dbsource =fs.readFileSync('db.json', "utf-8");
	jsondb = JSON.parse(dbsource.toString('utf8'));
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
 
//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}
 
//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}
 
 

// ==========================




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
	
	jsondb = JSON.parse(db.toString('utf8')); // removeme
	console.log("parseJSONdb \n\n\n" + db.toString());
	
	var html = '<div style="margin:20px 0;"> \n' 
	html += '<a href="#" class="easyui-linkbutton" onclick="getChecked()">GetChecked</a> \n' 
	html += '</div> \n' 
	html += '<div style="margin:10px 0"> \n' 

	//html += '<input type="checkbox"  checked onchange="$(\'#tt\').tree({cascadeCheck:$(this).is(\':checked\')})">CascadeCheck '
	//html += '<input type="checkbox" onchange="$(\'#tt\').tree({onlyLeafCheck:$(this).is(\':checked\')})">OnlyLeafCheck '  
	html += '</div>\n'  
	html += '<div class="easyui-panel" style="padding:5px"> \n'  
	html += '<ul id="tt" class="easyui-tree" data-options="url:\'db.json\',method:\'get\',animate:true,checkbox:true"></ul> \n' 
	html += '</div> \n'
	
	html += ' <script type="text/javascript"> \n'
    html += '     function getChecked(){ \n'
    html += '         var nodes = $(\'#tt\').tree(\'getChecked\'); \n'
    html += '         var s = []; \n'
    html += '         for(var i=0; i<nodes.length; i++){ \n'
    html += '             s[s.length] = nodes[i].id; \n'
    html += '         } \n'
	html += '         window.location.href = "./card?id=" + s[Math.floor(Math.random()*s.length)] +"&face=0"';
    html += '     } \n'
    html += ' </script> \n'
	
	parsed = menu.replace('<div id="tree"></div>', html);
	return (parsed);	
};

exports.parseJSONdb = parseJSONdb;
exports.parsexmldb = parsexmldb;
exports.mongoInit = mongoInit;
exports.JSONGet = JSONGet;
