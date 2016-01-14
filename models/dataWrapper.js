var fs = require ("fs"); 
var models = require('../models2/models');

var prettyjson = require('prettyjson');
var jsondb = jsondbfull = "";
function InitJSONDB() {
	console.log("InitJSONDB");	
	var dbsource =fs.readFileSync('libs/db.json', "utf-8");
	jsondb = JSON.parse(dbsource.toString('utf8'));
}

function convertDB(){
  
    //console.log(JSON.stringify(jsondb));

    var curricula = models.Curricula;
    var category = models.Subcategory;
    var card = models.Card;
    var face = {}

    var categorys = [];
    var curriculas = [];

   function mapObjects(obj) {
	    var objects = [];
	    for (var i in obj) {
	        if (!obj.hasOwnProperty(i)) continue;
	        
	        if(i == 'type' && obj[i] == "Curriculum"){
	        	var arabic = new curricula({
	        		name : obj['text'],
	        		admins : 'raz'
	        	});

	        	curriculas.push(arabic);

	        	arabic.save(function(err) {
				  if (err) throw err;

				  console.log('Curriculum created!');
				});
	        }

	        if(i == 'type' && obj[i] == "Lesson"){
	        	var lesson = new category({
	        		symbol : obj['text'],
	        		curricula : curriculas[0]
	        	})

	        	lesson.save(function(err) {
				  if (err) throw err;

				  console.log('Lesson created!');
				});

				categorys.push(lesson);
	        }

	        if(i == 'type' && obj[i] == "word"){
	        	
	        	var facess = [];
	        	var face1 = {}, face2 = {}, face3  = {};

	        	face1.ordernum = obj["heb"]["ordernum"];
	        	face1.symbol = obj["heb"]["symbol"];
	        	face1.text = obj["heb"]["text"];
	        	face1.sound = false;
	        	face1.previewDisplay = obj["heb"]["previewDisplay"];

				face2.ordernum = obj["eng"]["ordernum"];
	        	face2.symbol = obj["eng"]["symbol"];
	        	face2.text = obj["eng"]["text"];
	        	face2.sound = false;
	        	face2.previewDisplay = obj["eng"]["previewDisplay"];

	        	facess.push(face2);

				face3.ordernum = obj["arb"]["ordernum"];
	        	face3.symbol = obj["arb"]["symbol"];
	        	face3.text = obj["arb"]["text"];
	        	face3.sound = false;
	        	face3.previewDisplay = obj["arb"]["previewDisplay"];

				facess.push(face3);
				facess.push(face1);

	        	var word = new card({
					subcategory : categorys[categorys.length -1],
					name : obj["heb"]["text"], //symbol
					facess : facess
	        	});

	        	word.save(function(err) {
				  if (err) throw err;

				  console.log('word created!');
				});
	        }

	     
		    if (typeof obj[i] == 'object') {
	            mapObjects(obj[i]);    
	        }

	    }

	}

	mapObjects(jsondb);

}

InitJSONDB();
// convertDB();



function MoveCardToLesson(lesson, cardlist){
	var cards = cardlist.split(',');
	var less = getObjects(jsondb, 'id', lesson)[0];
	if (jsondb == "") InitJSONDB();
	
	// hard codded for now
	cards.forEach (function(element, index, array) { // mehh
		if (element.indexOf("es") < 0){
			jsondb[0].children[0].children[20].children[less.children.length] = getObjects(jsondb, 'id', parseInt(element))[0];
		}
	});

}

function remevoeCard(){

	//jsondb[0].children[0].children[20].children[less.children.length] 
}
function MenuTreeGet(){
	if (jsondb == "") InitJSONDB();
	return jsondb || ""; // change to jsondb
}

function Curriculums(){
	if (jsondb == "") InitJSONDB();
	Curriculums = getObjects(jsondb, 'type', "Curriculum");
	return Curriculums 
}

function jsonGetCuriculum(Curriculum_id){
	if (jsondb == "") InitJSONDB();
	console.log("jsonGetCuriculum " + Curriculum_id);
	
	Curriculum = getObjects(jsondb, 'id', Curriculum_id);
	
	return Curriculum || "";
}

function jsonGetLesson(Lesson_id){
	if (jsondb == "") InitJSONDB();
	
	Lesson = getObjects(jsondb, 'id', Lesson_id);
	console.log("jsondb :" + prettyjson.render(Lesson));
		
	return Lesson || "";
}

function jsonGetCardById(Card_id){
	if (jsondb == "") InitJSONDB();
	
	Card = getObjects(jsondb, 'id', Card_id);
	console.log("jsondb :" + prettyjson.render(Card));

	return Card|| "";
}

function jsonGetFaceCard(id, ordernum){
	card = jsonGetCardById(id)
	face = getObjects(card, 'ordernum', ordernum);
	
	return face|| "";
	
}

function stripFaces(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
		if ((key != "heb") && (key != "eng") &&(key != "arb") && (key != "type")){
			temp[key] = stripFaces(obj[key]);
		}
    }
 
    return temp;
}

// if ((key != "heb") && (key != "eng") &&(key != "arb")){
// 		if ((key === "id") || (key === "children") || (key === "text")){



exports.MenuTreeGet = MenuTreeGet;
exports.jsonGetCuriculum = jsonGetCuriculum;
exports.jsonGetLesson = jsonGetLesson;
exports.jsonGetCardById = jsonGetCardById;
exports.jsonGetFaceCard = jsonGetFaceCard;
exports.InitJSONDB = InitJSONDB;
exports.MoveCardToLesson = MoveCardToLesson;

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