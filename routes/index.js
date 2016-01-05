var express = require('express');
var router = express.Router();
var RequestHandler = require('../models/requestHandlers')
var url = require('url');
var data = require('../models/dataWrapper');
var mongodata = require('../models2/mongoAPI');
var api = require('./api');
var JSONAPI = require('../models/JSONAPI');
var models = require('../models2/models');

var util = require('util');

module.exports = function(app, passport) {

	/* GET home page - menu. */
	app.route('/menu')
		.get (function(req, res) {
			res.render('menu.ejs');
		})
		
		.post (function(req, res, next) {
		   console.log('req to / : ' + req.body.ids);
			// write id's to session
			// make card navigation between those marked
			sess=req.session;
			sess.ids = req.body.ids.toString();

		   // data.MoveCardToLesson('1135es', req.body.ids.toString());
		   res.redirect('/nextcard');
		})

	app.get('/Guest', function(req, res) {
		res.redirect('/menu');
	});

	app.get('/FB', function(req, res) {
		res.redirect('/menu');
	});

	app.get('/', function(req, res) {

			// render the page and pass in any flash data if it exists
			res.render('index.ejs', { message: req.flash('loginMessage') }); 
		});
		
		
	app.get('/login', function(req, res) {

			// render the page and pass in any flash data if it exists
			res.render('login.ejs', { message: req.flash('loginMessage') }); 
		});

	app.get('/signup', function(req, res) {

			// render the page and pass in any flash data if it exists
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
			
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
		
	app.get('/profile', isLoggedIn, function(req, res) {
			res.render('profile.ejs', {
				user : req.user // get the user out of session and pass to template
			});
		});
		
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
		});


	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on 
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}

	app.get('/db.mongo', function(req, res) {

		mongodata.Tester(res);
		//res.json(); // api tester
	});

	app.get('/db.json', function(req, res) {
		res.json(data.MenuTreeGet()); // change to api call
	});

	app.get('/public/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	app.get('/nextcard', function(req, res) {
			if(sess.ids){
				var cards = sess.ids.split(',');
				console.log('\n\n\n sess.ids : ' + sess.ids);

				var randid = cards[ parseInt(cards.length * Math.random())];
				if (randid == req.params.card_id){
					var randid = cards[cards.length];
				}

				var newurl = '/card?id=' + randid.toString() + '&face=0';
				res.redirect(newurl);
			}
	});

	app.get('/libs/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});

	// GET card 
	app.get('/card', function(req, res) {
		data = JSONAPI.JSONGet(req.param('id'), req.param('face'));	
		res.render('record.ejs', { 'cardID' : req.param('id'), 'dataText' : data["faceText"],
			 'dataSymbol' : data["faceSymbol"], 'faceRight' : (parseInt( req.param('face')) + 1),
			 'faceLeft' : (parseInt( req.param('face')) - 1) });
	});


};
