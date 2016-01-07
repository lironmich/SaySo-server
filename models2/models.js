
var mongoose = require('mongoose');


function mongoInit(){
  console.log("mongo Init");
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("mongo connection open");
      
  });
}

mongoose.connect('mongodb://localhost/cards');
var Schema = mongoose.Schema;


// Cards
var curriculaSchema = new Schema({
  name: String,
  admins: String, // users
});

var subcategorySchema = new Schema({
  curricula: [curriculaSchema],
  symbol: String, 
});



var cardSchema = new Schema({
  name: String,
  subcategory: [subcategorySchema],
  //tags: { type: [String], index: true } ,
  facess : [{
  		ordernum : Number,
  		symbol : String, //"subcategory_id.symbol",
			text : String,
			sound : Boolean,
			previewDisplay : Boolean
  		  }]
});


// SaySo

var languageSchema = new Schema({
  symbol : String,
  name : String,
})

var movieSchema = new Schema({
  name: String,
  provider: String, // maybe schema?
  link: String,
});



var subtitlesSchema = new Schema({
  movie: [movieSchema],
  subs : Object,
});


// Decs

var Movie = mongoose.model('Movie', movieSchema);
var Subtitle = mongoose.model('Subtitle', subtitlesSchema);

var Curricula = mongoose.model('Curricula', curriculaSchema);
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
var Card = mongoose.model('Card', cardSchema);

exports.Movie = Movie;
exports.Subtitle = Subtitle;

exports.Curricula = Curricula;
exports.Subcategory = Subcategory;
exports.Card = Card;
