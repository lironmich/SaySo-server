var express = require('express');
var router = express.Router();
var RequestHandler = require('../requestHandlers')
var url = require('url');
var data = require('../dataWrapper');
var api = require('./api');

var util = require('util');

/* GET home page - menu. */
router.get('/', function(req, res) {
	RequestHandler.menuHandler(res);
});


router.post('/', function(req, res, next) {
   console.log('req to / : ' + req.body.ids);
   data.MoveCardToLesson('1112es', req.body.ids.toString());
   res.redirect('/');
});



router.get('/db.json', function(req, res) {
	res.json(data.MenuTreeGet()); // change to api call
});

router.get('/styles/*', function(req, res) {
	var path = "." + url.parse(req.url).pathname;
	RequestHandler.defaultHandler(res, path);
});

router.get('/nextcard/*', function(req, res) {
	// get next card from users pool.
});

router.get('/libs/*', function(req, res) {
	var path = "." + url.parse(req.url).pathname;
	RequestHandler.defaultHandler(res, path);
});

// GET card 
router.get('/card', function(req, res) {
	
	var id = req.param('id');
	var face = req.param('face'); // update me
	
	RequestHandler.cardHandler(res, id, face);
});

module.exports = router;