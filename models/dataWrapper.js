var fs = require ("fs"); 

var prettyjson = require('prettyjson');
var jsondb = jsondbfull = "";
function InitJSONDB(){
	console.log("InitJSONDB");	
	var dbsource =fs.readFileSync('./db.json', "utf-8");
	//  var dbsource =fs.readFileSync("/Users/razkron/flashCards/db.json", "utf-8");

	jsondb = JSON.parse(dbsource.toString('utf8'));
	jsondbfull = jsondb;
	//jsondb = stripFaces(jsondb);
	//console.log("jsondb : " + jsondb);
}

InitJSONDB();

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