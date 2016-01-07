var models = require('./models');
var prettyjson = require('prettyjson');
var fs = require ("fs");

var Q = require('q');

var curricula = models.Curricula;
var category = models.Subcategory;
var card = models.Card;
var face = {};

var movie = models.Movie;
var sub = models.Subtitle;


var convertSub = function(){
	console.log("converting subtitles");

	// open files
	var en =fs.readFileSync('./Input/SV-2x1 en.srt', "utf-8");
	var fr =fs.readFileSync('./Input/SV-2x1 fr.srt', "utf-8");
	var pt =fs.readFileSync('./Input/SV-2x1 pt.srt', "utf-8");

	// parse to json
	ens =en.split('\r');
	frs =fr.split('\r');
	pts =pt.split('\r');


	var t=1;




	// save to db

};


var getCardWithQ = function (){
	var deferred = Q.defer();

	card.findOne({name: 'גלידה'}, function(err, cards){
		if (err) {deferred.reject(err)}

		else{
			deferred.resolve( cards);
		}
	})


	return deferred.promise;
};


function Tester(res){

	convertSub();

	res.json("");

	//

}

// function Tester(res){
// getCardWithQ()
//	.then(function(data){
//		console.log(data);
//		res.json(data);
//	})
//	.catch(function(error){
//		res.json(error);
//	});
//}
exports.Tester = Tester;
