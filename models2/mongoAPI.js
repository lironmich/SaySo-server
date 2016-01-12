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


// get movie list
function clipList(res){
	var list = [{
		name : "movie1",
		provider : "movie2",
		link : "url//blala",
		},
	{
		name : "movie2222",
		provider : "movie222222222",
		link : "url//blalablalablala",
	}];

	res.json(list);
}

// add / update clip

// get clip

var convertSub = function(){
	console.log("converting subtitles");

	// open files
	var en =fs.readFileSync('./Input/SV-2x1 en.srt', "utf-8");
	//var fr =fs.readFileSync('./Input/SV-2x1 fr.srt', "utf-8");
	//var pt =fs.readFileSync('./Input/SV-2x1 pt.srt', "utf-8");

	// parse to json
	ens = en.split('\r');
	for (var line in ens) {
		if (parseInt(ens[line])) {
		// if (ens[line].match("\d+")){ // ? why like this ?
			var i="i";
		}
		else{
			var i=0;
		}
	}
	// for line in ens
	// if block number create block
	// if 2 lines of subtitles split time and add block
	// insert timestamp : text for 1 or 2 blocks


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

	//clipslist(res);
	//convertSub();
	//res.json("");
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
exports.clipList = clipList;
