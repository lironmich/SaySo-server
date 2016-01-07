var models = require('./models');
var prettyjson = require('prettyjson');

var Q = require('q');

var curricula = models.Curricula;
var category = models.Subcategory;
var card = models.Card;
var face = {}

var getCardWithQ = function (){
	var deferred = Q.defer();

	card.findOne({name: 'גלידה'}, function(err, cards){
		if (err) {deferred.reject(err)}

		else{
			deferred.resolve( cards);
		}

	})


	return deferred.promise;
}


function Tester(res){

	getCardWithQ()
		.then(function(data){
			console.log(data);
			res.json(data);
		})
		.catch(function(error){
			res.json(error);
		});

}

exports.Tester = Tester;
