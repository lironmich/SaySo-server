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
var moviesubtitles = models.MovieSubtitles;


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

function getMovieByName(name) {

}

function getMovieByID(id) {

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

// say so mocks
exports.InitDBMocks = InitDBMocks;
exports.viewFiles = viewFiles;

exports.getMovieSub = getMovieSub;
exports.getMovies = getMovies;
exports.getLanguages = getLanguages;


// SaySo mocks makers

function InitDBMocks(res) {

	parseSV2x1();
	InitCardsDb();
	res.json("Initing DB");
}

function getMovieSub(req, res) {

	lan_code = req.query.lancode || 'sp';
	movie_id = req.params.id; // original movie_id + lancode = subtitle_movie_schema
	start_time = req.query.start_time || 0;
	end_time = req.query.end_time || 4*60*100;

	// , startTime : start_time, endtTime : end_time
	moviesubtitles.find({'destlan.symbol' : lan_code,
						 'subs.source_lan.startTime' : { $gt : start_time, $lt : end_time}  }, function(err, sub) {
		if (err) res.json.reject(err)
	}).then(function(sub){
		res.json(sub);
	});
}

function getLanguages(req, res) {

	language.find({}, function(err, lan) {
		if (err) res.json.reject(err)
	}).then(function(lan){
		res.json(lan);
	});
}

function getMovies(req, res) {
// category, source_language, dest_language

	movie.find({}, function(err, mov) {
		if (err) res.json.reject(err)
	}).then(function(mov){
		res.json(mov);
	});
}

function viewFiles(res) {

		moviesubtitles.find({}, function(err, sub) {
			if (err) res.json.reject(err)
		}).then(function(err, sub){
				res.json(err);
		});
}

function parseSV2x1() {

	lan = models.Language;
	lansData = [{symbol : 'en', name : 'English'},
		{symbol : 'sp', name : 'Spanish'},
		{symbol : 'pt', name : 'Portuguese'},
		{symbol : 'ar', name : 'Arabic'},
		{symbol : 'he', name : 'Hebrew'},
		{symbol : 'de', name : 'German'},
		{symbol : 'el', name : 'Greek'},
		{symbol : 'fr', name : 'French'},
		{symbol : 'ru', name : 'Russian'},
		{symbol : 'ja', name : 'Japanese'},
		{symbol : 'zh', name : 'Chinese'},
		{symbol : 'nl', name : 'Dutch'},
		{symbol : 'da', name : 'Danish'},
		{symbol : 'fi', name : 'Finnish'}
	];

	console.log('InitSaySoDb() {');

	lansdoc = [];
	lansData.forEach(function(el){
		lang = new lan(el)
		lansdoc.push(lang);
	});

	mov = models.Movie;
	moviesData = [{name : "movie1", provider : "provider", link : "link", Img : "img", source_lan : lansdoc[0]},
		{name : "movie2222", provider : "provider2222", link : "link222", Img : "img22", source_lan : lansdoc[0]},
		{name : "movie333", provider : "provider333", link : "link333", Img : "img33", source_lan : lansdoc[0]},
	];

	moviesDoc =[];
	moviesData.forEach(function(el) {
		movie = new mov(el);
		moviesDoc.push(movie);
	});

	var filesrtsp = fs.readFileSync('res/sv2x1.srt', "utf-8"); // spanish
	var filesrten = fs.readFileSync('res/sv2x2.srt', "utf-8"); // english
	var filesrtpt = fs.readFileSync('res/sv2x3.srt', "utf-8"); // portuguese

	var sp = srtp.parser.fromSrt(filesrtsp, true, true);
	var en = srtp.parser.fromSrt(filesrten, true, true);
	var pt = srtp.parser.fromSrt(filesrtpt, true, true);

	srtb = models.SrtBlock;
	var mvsubs;
	ens=[];
	sps=[];
	pts=[];

	en.forEach(function(el) {
		bl = new srtb(el);
		ens[parseInt(bl.id)] = bl;
	});

	sp.forEach(function(el) {
		sl = new srtb(el);
		sps[parseInt(sl.id)] = sl;
	});

	pt.forEach(function(el) {
		sl = new srtb(el);
		pts[parseInt(sl.id)] = sl;
	});

	var dstlans = [lansdoc[1] , lansdoc[2]];
	movieDoc = new models.Movie({name : "SV1", provider : "provider333", link : "link333", Img : "img33",
		source_lan : lansdoc[0], dest_lans : dstlans});

	var len = Math.max(ens.length, sps.length);

	var spens = [];

	for (i = 0; i < len; i++) {
		var spen = new saysoblock;
		spen.source_lan = ens[i];
		spen.dest_lan_block = sps[i];
		spen.trans_block = {};
		spen.block_no = i;
		spen.dest_couplings = {};
		spen.trance_couplings = {};
		spens.push(spen);
	}

	var len2 = Math.max(ens.length, pts.length);

	var ptens = [];
	for (i = 0; i < len2; i++) {
		var pten = new saysoblock;
		pten.source_lan = ens[i];
		pten.dest_lan_block = sps[i];
		pten.trans_block = {};
		pten.block_no = i;
		pten.dest_couplings = {};
		pten.trance_couplings = {};
		// mvsubs.subs.body.push(spen);
		ptens.push(pten);
	}


	var mvsubssp = new models.MovieSubtitles({
		movie : movieDoc,
		destlan : lansdoc[1],
		subs : spens,
	});

	var mvsubspt = new models.MovieSubtitles({
		movie : movieDoc,
		destlan : lansdoc[2],
		subs : ptens,
	});


	lansdoc.forEach(function(el) {
		el.save(function(err) {
			if (err) throw err;
			console.log('sayso lansdoc created! ');
		});
	});

	moviesDoc.forEach(function(el) {
		el.save(function(err) {
			if (err) throw err;
			console.log('sayso moviesDoc created! ');
		});
	});

	//pts.forEach(function(el) {
	//	el.save(function(err) {
	//		if (err) throw err;
	//		console.log('sayso pts created! ');
	//	});
	//});
    //
	//sps.forEach(function(el) {
	//	el.save(function(err) {
	//		if (err) throw err;
	//		console.log('sayso sps created! ');
	//	});
	//});
    //
	//ens.forEach(function(el) {
	//	el.save(function(err) {
	//		if (err) throw err;
	//		console.log('sayso eps created! ');
	//	});
	//});
    //
	//spens.forEach(function(el) {
	//	el.save(function (err) {
	//		if (err) throw err;
	//		console.log('sayso spens created! ');
	//	});
	//});
    //
	//ptens.forEach(function(el) {
	//	el.save(function (err) {
	//		if (err) throw err;
	//		console.log('sayso ptens created! ');
	//	});
	//});

	mvsubspt.save(function(err) {
		if (err) throw err;
		console.log('sayso mvsubspt created! ');
	});

	mvsubssp.save(function(err) {
		if (err) throw err;
		console.log('sayso mvsubssp created! ');
	});
	//  pts, sps, ens, spens, lansdoc, moviesDoc .save()

}

function InitCardsDb() {

	var prettyjson = require('prettyjson');
	var jsondb = "";

	// console.log("InitJSONDB");
	var dbsource =fs.readFileSync('res/carddb.json', "utf-8");
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

					//console.log('Curriculum created!');
				});
			}

			if(i == 'type' && obj[i] == "Lesson"){
				var lesson = new category({
					symbol : obj['text'],
					curricula : curriculas[0]
				})

				lesson.save(function(err) {
					if (err) throw err;

					//console.log('Lesson created!');
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

					// console.log('word created!');
				});
			}

			if (typeof obj[i] == 'object') {
				mapObjects(obj[i]);
			}
		}
	}

	mapObjects(jsondb);
}