var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// res.json({ message: 'hooray! welcome to our api!' });  
    res.render('index', { title: 'Express' });
});

module.exports = router;


/*
//	/api/Curricula		GET
router.get('/', function(req, res) {};

//	/api/Curriculum					GET
router.get('/', function(req, res) {};

//	/api/Curriculum:Curriculum_id	GET
router.get('/', function(req, res) {};

//	/api/Curriculum					PUT
//	/api/Curriculum:Curriculum_id	UPDATE
//	/api/Curriculum:Curriculum_id	DELETE


//	/api/Curriculum/Lesson:Lesson_id	GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson				GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson  			PUT
//	/api/Curriculum/Lesson:Lesson_id  	UPDATE
//	/api/Curriculum/Lesson:Lesson_id  	DELETE
//
//	/api/Curriculum/Lesson/card				GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson/card:card_id		GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson/card 			PUT
//	/api/Curriculum/Lesson/card:card_id 	UPDATE
//	/api/Curriculum/Lesson/card:card_id 	DELETE
//
//	/api/Curriculum/Lesson/card/face			GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson/card/face:face_id	GET
router.get('/', function(req, res) {};

//	/api/Curriculum/Lesson/card/face    		PUT
//	/api/Curriculum/Lesson/card/face:face_id    UPDATE
//	/api/Curriculum/Lesson/card/face:face_id    DELETE
			

*/