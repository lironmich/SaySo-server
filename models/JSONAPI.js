var mongoose = require('mongoose');
var fs = require ("fs"); // remove me
var jsondb=""; // remove me
var prettyjson = require('prettyjson');
var models = require('../models/models');



function JSONGet(cardID, cardFace){
	if (jsondb===""){
		InitJSONDB();
	}
	var id = parseInt(cardID);
	var facenum = parseInt(cardFace);
	

	record = getObjects(jsondb, 'id', id);
	face = getObjects(record, 'ordernum', cardFace);

	var data={};
	if (face.length > 0){
		data["faceText"] = face[0]["text"];
		data["faceSymbol"] = face[0]["symbol"] ;
	}
	else {
		data["faceText"] =  "out of boundary";
		data["faceSymbol"] =  "OOB";
	}

	return data;
}

function InitJSONDB(){ 
	var dbsource =fs.readFileSync('db.json', "utf-8");
	jsondb = JSON.parse(dbsource.toString('utf8'));
}

function GetJSONDB(){
	if (jsondb===""){
		InitJSONDB();
	}
	return jsondb;
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
 
exports.JSONGet = JSONGet;
exports.GetJSONDB = GetJSONDB;
