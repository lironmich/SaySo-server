//var express = require('express');
//var router = express.Router();
var data = require('../models/dataWrapper');

// var prettyjson = require('prettyjson');

module.exports = function(app, passport) {
	
app.get('/', function(req, res) {
	res.json(data.MenuTreeGet());
});

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

// router.route('/Curriculum:Curriculum_id/Lesson:Lesson_id')

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
	
app.route('/Curriculums')
	.get(function(req, res) {
		res.json(data.Curriculums());
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

};