var express = require('express');
var router = express.Router();
var data = require('../dataWrapper');

var prettyjson = require('prettyjson');

/* GET home page. */
router.get('/', function(req, res) {
	res.json(data.MenuTreeGet());
});

router.route('/Curriculum:Curriculum_id')

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

router.route('/Lesson:Lesson_id')

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

router.route('/card:card_id/face:ordernum')
    .get(function(req, res) {
		id = req.params.card_id;
		ordernum = req.params.ordernum;
		console.log("ordernum : " + ordernum);
		res.json(data.jsonGetFaceCard(id, ordernum));
    })
	
router.route('/card:card_id')
	
    .get(function(req, res) {
		id = req.params.card_id;
		console.log("id " + id);
		res.json(data.jsonGetCardById(id));
    })
	
router.route('/Curriculum:Curriculum_id/Lesson:Lesson_id/card:card_id')

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
	
router.route('/Curriculums')
	.get(function(req, res) {
		res.json(data.Curriculums());
    })
	
router.route('/Curriculum:Curriculum_id/Lesson:Lesson_id/card:card_id/face:symbol')

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

module.exports = router;