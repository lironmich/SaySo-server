var models = require('./models');
var fs = require ("fs"); // remove me

var srtp = require('../libs/srtparser.js');

var Q = require('q');
var mongoose = require('mongoose');

var curricula = models.Curricula;
var category = models.Subcategory;
var card = models.Card;
var face = {};

var movie = models.Movie;
var language = models.Language;
var srtblock = models.SrtBlock;
var saysoblock = models.SaySoBlock;
var moviesubtitles = models.MovieSubtitle;


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
function cardsByCategory(res, id){
	var oid = mongoose.Types.ObjectId(id);

	var getCards = function (){
		var deferred = Q.defer();
		card.find({"subcategory._id": oid }, function(err, car){
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

// get categorys by curicula
function categorysByCurricula(res, id){

	var oid = mongoose.Types.ObjectId(id)
	var getCards = function (){
		var deferred = Q.defer();
		category.find({"curricula._id": oid}, function(err, car){
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

// SaySo

function parseFiles(res) {

	InitializeDb();
	res.json("");

	//var getMovieSub = function (){
	//	var deferred = Q.defer();
	//	moviesubtitles.find({}, function(err, sub){ // "movie.name": "SV1"
	//		if (err) {deferred.reject(err)}
	//		else{
	//			deferred.resolve( sub);
	//		}
	//	})
	//	return deferred.promise;
	//};

	//getMovieSub()
	//		.then(function(data){
	//			console.log("getMovieSub");
	//			res.json(data);
	//		})
	//		.catch(function(error){
	//			console.log(error);
	//			res.json(error);
	//		});
}


// get movie list stub Initial
function clipList(res) {
	var list = [{
		name: "movie1",
		provider: "movie2",
		link: "url//blala",
	},
		{
			name: "movie2222",
			provider: "movie222222222",
			link: "url//blalablalablala",
		}];

	res.json(list);
}
// add / update clip

// get clip



// say so
exports.clipList = clipList;
exports.parsefiles = parseFiles;

// flash cards
exports.curriculasList = curriculasList;
exports.categorysList = categorysList;

exports.categorysList = categorysList;
exports.categorysByCurricula = categorysByCurricula;

exports.cardsList = cardsList;
exports.cardsByCategory = cardsByCategory;
exports.cardsById = cardsById;


function InitializeDb(){

	 //InitSaySoDb();
	 //InitCardsDb();
	 parseSV2x1();

}


function parseSV2x1() {

	var filesrtsp = fs.readFileSync('libs/sv2x1.srt', "utf-8"); // spanish
	var filesrten = fs.readFileSync('libs/sv2x2.srt', "utf-8"); // english
	var filesrtpt = fs.readFileSync('libs/sv2x3.srt', "utf-8"); // portuguese

	var sp = srtp.parser.fromSrt(filesrtsp, false, true);
	var en = srtp.parser.fromSrt(filesrten, false, true);
	var pt = srtp.parser.fromSrt(filesrtpt, false, true);

	srtb = models.SrtBlock;
	var mvsubs;
	ens=[];
	sps=[];
	pts=[];

	en.forEach(function(el) {
		bl = new srtb(el);
		bl.save(function(err) {
			if (err) throw err;
			console.log('en block created! ');
		});
		//.then(function() {
		//	ens[parseInt(bl.id)] = bl;
		//});
	});

	sp.forEach(function(el) {
		sl = new srtb(el);
		sl.save(function(err) {
			if (err) throw err;
			console.log('sp block created! ');
		});
		//.then(function() {
		//	sps[parseInt(sl.id)] = sl;
		//});
	});

	pt.forEach(function(el) {
		pl = new srtb(el);

		pl.save(function(err) {
			if (err) throw err;
			console.log('pt block created! ');
		});
		//		.then(function() {
		//	pts[parseInt(pl.id)] = pl;
		//});
	});


	// dependent on movie
	//movie.find({name : "SV1"}, function(err, mv) { // get as var
    //
	//	mvsubs = new moviesubtitles;
	//	mvsubs.movie = mv;
    //
	//	language.find({symbol : 'sp'}, function(err, spLang){ // get as var
	//		if (err) {deferred.reject(err)}
	//		else {
	//			var len = Math.max(ens.length, sps.length);
    //
	//			for (i = 0; i < len; i++) {
    //
	//				var spen = new saysoblock({
	//					source_lan : ens[i], dest_lan_id : spLang, dest_lan_block : sps[i] , trans_block : {}, block_no : i,
	//					dest_couplings  : {}, trance_couplings  : {},
	//				});
    //
	//				spen.save(function(err) {
	//					if (err) throw err;
	//					console.log('sayso block created! ');
	//				});
	//				mvsubs.subs.push(spen)
	//				mvsubs.save(function(err) {
	//					if (err) throw err;
	//					console.log('mvsubs updated with sayso block! ');
	//				});
	//			}
	//		}
	//	});
    //
	//	language.find({symbol : 'pt'}, function(err, ptLang){ // get as var
	//		if (err) {deferred.reject(err)}
	//		else {
	//			var len = Math.max(ens.length, pts.length);
    //
	//			for (i = 0; i < len; i++) {
    //
	//				var spen = new saysoblock({
	//					source_lan : ens[i], dest_lan_id : ptLang, dest_lan_block : pts[i] , trans_block : {}, block_no : i,
	//					dest_couplings  : {}, trance_couplings  : {},
	//				});
    //
	//				spen.save(function(err) {
	//					if (err) throw err;
	//					console.log('sayso block created! ');
	//				});
	//				mvsubs.subs.push(spen)
	//				mvsubs.save(function(err) {
	//					if (err) throw err;
	//					console.log('mvsubs updated with sayso block!');
	//				});
	//			}
	//		}
	//	});
	//});
}


function InitSaySoDb(){
	lan = models.Language;
	lans = [{symbol : 'en', name : 'English'},
		{symbol : 'ar', name : 'Arabic'},
		{symbol : 'he', name : 'Hebrew'},
		{symbol : 'de', name : 'German'},
		{symbol : 'el', name : 'Greek'},
		{symbol : 'fr', name : 'French'},
		{symbol : 'pt', name : 'Portuguese'},
		{symbol : 'ru', name : 'Russian'},
		{symbol : 'ja', name : 'Japanese'},
		{symbol : 'zh', name : 'Chinese'},
		{symbol : 'nl', name : 'Dutch'},
		{symbol : 'da', name : 'Danish'},
		{symbol : 'fi', name : 'Finnish'}
	];

	lans.forEach(function(el){
			lang = new lan(el)
			lang.save(function(err) {
				if (err) throw err;
				console.log('language created!');
			});
	});

	language.find({symbol : 'en'}, function(err, enLan){
		if (err) {deferred.reject(err)}
		else{
			mov = models.Movie;
			movies = [{name : "movie1", provider : "provider", link : "link", Img : "img", source_lan : enLan},
				{name : "movie2222", provider : "provider2222", link : "link222", Img : "img22", source_lan : enLan},
				{name : "movie333", provider : "provider333", link : "link333", Img : "img33", source_lan : enLan},
				{name : "SV1", provider : "provider333", link : "link333", Img : "img33", source_lan : enLan},
			];

			movies.forEach(function(el){
				movie = new mov(el);
				movie.save(function(err) {
					if (err) throw err;
					console.log('movie created!');
				});
			})
		}
	})
}

function InitCardsDb() {

	var prettyjson = require('prettyjson');
	var jsondb = "";

	// console.log("InitJSONDB");
	var dbsource =fs.readFileSync('libs/carddb.json', "utf-8");
	jsondb = JSON.parse(dbsource.toString('utf8'));

	var curricula = models.Curricula;
	var category = models.Subcategory;
	var card = models.Card;
	var face = {};

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