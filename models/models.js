
var mongoose = require('mongoose');


function mongoInit(){
  console.log("mongo Init");
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("mongo connection open");
      
  });
}

mongoose.connect('mongodb://localhost/cards3');
var Schema = mongoose.Schema;

var curriculaSchema = new Schema({
  name: String,
  admins: String, // users
});

var subcategorySchema = new Schema({
  curricula: [curriculaSchema],
  symbol: String, 
});


var cardSchema = new Schema({
  cardname: String,
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

var Curricula = mongoose.model('Curricula', curriculaSchema);
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
var Card = mongoose.model('Card', cardSchema);

exports.Curricula = Curricula;
exports.Subcategory = Subcategory;
exports.Card = Card;
