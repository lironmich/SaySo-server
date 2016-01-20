var mongoose = require('mongoose');

function mongoInit(){
  console.log("mongo Init");
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("mongo connection open");
  });
}

mongoose.connect('mongodb://razawirazawi:Aq123456@ds047355.mongolab.com:47355/saysoalfa');

//mongoose.connect('mongodb://localhost/cards');
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
  facess : [{
  		    ordernum : Number,
  		    symbol : String, //"subcategory_id.symbol",
			text : String,
			sound : Boolean,
			previewDisplay : Boolean
  		  }],
});

// SaySo

var languageSchema = new Schema({
  symbol : String,
  name : String,
});

var movieSchema = new Schema({
  name: String,
  provider: String, // maybe schema?
  link: String,
  source_lan: [languageSchema],
  dest_lans: [languageSchema],
  Img: String,
});

var srtBlockSchema = new Schema({
  id: String,
  startTime: String,
  endTime: String,
  text: String,
});

// add a virtual that returns startTime-->endTime
srtBlockSchema.virtual('time')
    .get( function () {
        return this.startTime + '-->' + this.endTime;
    });

var saySoBlockSchema = new Schema({
  source_lan : [srtBlockSchema],      // block
  dest_lan_id : [languageSchema],
  dest_lan_block : [srtBlockSchema],  // block
  trans_block : [srtBlockSchema],     // block
  block_no : Number,
  dest_couplings  : {},
  trance_couplings  : {},
});

var movieSubtitlesSchema = new Schema({
  movie : [movieSchema],
  lan: [languageSchema],
  subs  : [saySoBlockSchema], // array
});

// Decs

var Movie = mongoose.model('Movie', movieSchema);
var Language = mongoose.model('Language', languageSchema);
var SrtBlock = mongoose.model('SrtBlock', srtBlockSchema);
var SaySoBlock = mongoose.model('SaySoBlock', saySoBlockSchema);
var MovieSubtitles = mongoose.model('MovieSubtitles', movieSubtitlesSchema);

exports.Movie = Movie;
exports.Language = Language;
exports.SrtBlock = SrtBlock;
exports.SaySoBlock = SaySoBlock;
exports.MovieSubtitles = MovieSubtitles;

// Card decks

var Curricula = mongoose.model('Curricula', curriculaSchema);
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
var Card = mongoose.model('Card', cardSchema);

exports.Curricula = Curricula;
exports.Subcategory = Subcategory;
exports.Card = Card;
