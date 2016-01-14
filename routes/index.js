var express = require('express');
var router = express.Router();
var RequestHandler = require('../models/requestHandlers')
var url = require('url');
var data = require('../models/dataWrapper');
var mongodata = require('../models2/mongoAPI');
var subapi = require('./subapi');
var JSONAPI = require('../models/JSONAPI');
var models = require('../models2/models');

var util = require('util');

module.exports = function(app, passport) {

	// Auth

	/* GET home page - menu. */
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

	app.get('/controllers/*', function(req, res) {
		var path = "." + url.parse(req.url).pathname;
		RequestHandler.defaultHandler(res, path);
	});


	// cards mongo API

	app.get('/curriculumslist', function(req, res) { // New Mongo ??
		mongodata.curriculasList(res);
	});

	app.get('/fullcategoryslist', function(req, res) { // New Mongo !!
		mongodata.categorysList(res);
	});

	// 127.00.1:8888/categorys/curiculum5687dfdc4983004b2dc62ad0
	app.get('/categorys/curiculum:curiculumid', function(req, res) { // New Mongo !!
		mongodata.categorysByCurricula(res, req.params.curiculumid);
		console.log('req.params.curiculumid  ' + req.params.curiculumid);
	});

	app.get('/fullcardslist', function(req, res) { // New Mongo ??
		mongodata.cardsList(res);
	});

	// 127.00.1:8888/cardslist/category5687dfdc4983004b2dc62ad1
	app.get('/cardslist/category:categoryid', function(req, res) { // New Mongo ??
		mongodata.cardsByCategory(res, req.params.categoryid);
		console.log ('req.params.categoryid  ' + req.params.categoryid);
	});

	// 127.00.1:8888/cardslist/card5687dfdc4983004b2dc62ade
	app.get('/cardslist/card:cardid', function(req, res) { // New Mongo ??
		mongodata.cardsById(res, req.params.cardid);
		console.log ('req.params.cardid  ' + req.params.cardid);
	});







	// GET card 
	app.get('/card', function(req, res) {
		data = JSONAPI.JSONGet(req.param('id'), req.param('face'));	
		res.render('record.ejs', { 'cardID' : req.param('id'), 'dataText' : data["faceText"],
			 'dataSymbol' : data["faceSymbol"], 'faceRight' : (parseInt( req.param('face')) + 1),
			 'faceLeft' : (parseInt( req.param('face')) - 1) });
	});


	app.route('/card:card_id/face:ordernum')
			.get(function(req, res) {
				id = req.params.card_id;
				ordernum = req.params.ordernum;
				console.log("ordernum : " + ordernum);
				res.json(data.jsonGetFaceCard(id, ordernum));
			})

	app.route('/card:card_id')

			.get(function(req, res) {
				id = req.params.card_id;
				console.log("id " + id);
				res.json(data.jsonGetCardById(id));
			})


	app.route('/Lesson:Lesson_id')

			.get(function(req, res) {
				id = req.params.Lesson_id;
				res.json(data.jsonGetLesson(id));
			})

			.put(function(req, res) {
				console.log('put function');
			})

			.delete(function(req, res) {
				console.log('delete function');
			})

			.post(function(req, res) {
				console.log('post function');
			})

	app.route('/Curriculum:Curriculum_id')

			.get(function(req, res) {

				id = req.params.Curriculum_id;
				res.json(data.jsonGetCuriculum(id));
			})

			.put(function(req, res) {
				console.log('put function');
			})

			.delete(function(req, res) {
				console.log('delete function');
			})

			.post(function(req, res) {
				console.log('post function');
			})


	app.route('/Curriculum:Curriculum_id/Lesson:Lesson_id/card:card_id')

			.get(function(req, res) {
				id = req.params.card_id;
				res.json(data.jsonGetCard(id));
			})

			.put(function(req, res) {
				console.log('put function');
			})

			.delete(function(req, res) {
				console.log('delete function');
			})

			.post(function(req, res) {
				console.log('post function');
			})



	app.route('/Curriculum:Curriculum_id/Lesson:Lesson_id/card:card_id/face:symbol')

			.get(function(req, res) {

				res.json("");
			})

			.put(function(req, res) {
				console.log('put function');
			})

			.delete(function(req, res) {
				console.log('delete function');
			})

			.post(function(req, res) {
				console.log('post function');
			})


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

};
