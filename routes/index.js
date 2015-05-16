var express = require('express');
var router = express.Router();
var RequestHandler = require('../requestHandlers')
var url = require('url');

/* GET home page - menu. */
router.get('/', function(req, res) {
	// res.json({ message: 'hooray! welcome to our api!' });  
    //res.render('index', { title: 'Express' });
	console.log ('menu handler');
	RequestHandler.menuHandler(res);
});

router.get('/styles/*', function(req, res) {
	var path = "." + url.parse(req.url).pathname;
	RequestHandler.defaultHandler(res, path);
});

router.get('/libs/*', function(req, res) {
	var path = "." + url.parse(req.url).pathname;
	RequestHandler.defaultHandler(res, path);
});

router.get('/db.json', function(req, res) {
	var path = "." + url.parse(req.url).pathname;
	RequestHandler.defaultHandler(res, path);
});

// GET card 
router.get('/card', function(req, res) {
	
	var id = req.param('id');
	var face = req.param('face'); // update me
	
	RequestHandler.cardHandler(res, id, face);
	// res.json({ message: 'hooray! welcome to our api!' });  
    // res.render('index', { title: 'Card' });
});

module.exports = router;