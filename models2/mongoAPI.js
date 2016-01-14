var models = require('./models');

var Q = require('q');
var mongoose = require('mongoose');

var curricula = models.Curricula;
var category = models.Subcategory;
var card = models.Card;
var face = {};

var movie = models.Movie;
var sub = models.Subtitle;


// get cards by curriculas
function curriculasList(res){

	var getCuriculas = function (){
		var deferred = Q.defer();
		curricula.find({}, function(err, curics){
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( curics);
			}
		})

		return deferred.promise;
	};

	getCuriculas()
		.then(function(data){
			console.log(data);
			res.json(data);
		})
		.catch(function(error){
			res.json(error);
		});
}

// get cards by Subcategory

// get all categorys
function categorysList(res){

	var getCategorys = function (){
		var deferred = Q.defer();
		category.find({}, function(err, categ){
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( categ);
			}
		})

		return deferred.promise;
	};

	getCategorys()
			.then(function(data){
				// console.log(data);
				res.json(data);
			})
			.catch(function(error){
				res.json(error);
			});
}

// get all cards
function cardsList(res){

	var getCards = function (){
		var deferred = Q.defer();
		card.find({}, function(err, car){
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( car);
			}
		})

		return deferred.promise;
	};

	getCards()
			.then(function(data){
				// console.log(data);
				res.json(data);
			})
			.catch(function(error){
				// console.log(error);
				res.json(error);
			});
}

// find card id by name

// get card by id
function cardsById(res, id){
	var oid = mongoose.Types.ObjectId(id)
	var getCards = function (){
		var deferred = Q.defer();
		card.find({"_id": oid }, function(err, car){
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( car);
			}
		})

		return deferred.promise;
	};

	getCards()
			.then(function(data){
				// console.log(data);
				res.json(data);
			})
			.catch(function(error){
				// console.log(error);
				res.json(error);
			});
}

// find category id by name

// get cards by category id	???
function cardsByCategory(res, id){ 		// ???
	var oid = mongoose.Types.ObjectId(id);


	var getCards = function (){
		var deferred = Q.defer();
		card.find({"subcategory" : { "_id": "5687dfdc4983004b2dc62ad0" }}, function(err, car){          //  ????
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( car);
			}
		})

		return deferred.promise;
	};

	getCards()
			.then(function(data){
				// console.log(data);
				res.json(data);
			})
			.catch(function(error){
				// console.log(error);
				res.json(error);
			});
}

// get categorys by curicula ???
function categorysByCurricula(res, id){		// ????

	var oid = mongoose.Types.ObjectId(id)
	var getCards = function (){
		var deferred = Q.defer();
		category.find({"_id": id}, function(err, car){
			if (err) {deferred.reject(err)}
			else{
				deferred.resolve( car);
			}
		})

		return deferred.promise;
	};

	getCards()
			.then(function(data){
				// console.log(data);
				res.json(data);
			})
			.catch(function(error){
				// console.log(error);
				res.json(error);
			});
}





// get movie list stub Initial
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

// add / update clip

// get clip
//
//var convertSub = function(){
//	console.log("converting subtitles");
//
//	// open files
//	var en =fs.readFileSync('./Input/SV-2x1 en.srt', "utf-8");
//	//var fr =fs.readFileSync('./Input/SV-2x1 fr.srt', "utf-8");
//	//var pt =fs.readFileSync('./Input/SV-2x1 pt.srt', "utf-8");
//
//	// parse to json
//	ens = en.split('\r');
//	for (var line in ens) {
//		if (parseInt(ens[line])) {
//		// if (ens[line].match("\d+")){ // ? why like this ?
//			var i="i";
//		}
//		else{
//			var i=0;
//		}
//	}
	// for line in ens
	// if block number create block
	// if 2 lines of subtitles split time and add block
	// insert timestamp : text for 1 or 2 blocks

	// var t=1;

	// save to db

//};
}



// say so
exports.clipList = clipList;

// flash cards
exports.curriculasList = curriculasList;
exports.categorysList = categorysList;

exports.categorysList = categorysList;
exports.categorysByCurricula = categorysByCurricula;

exports.cardsList = cardsList;
exports.cardsByCategory = cardsByCategory;
exports.cardsById = cardsById;