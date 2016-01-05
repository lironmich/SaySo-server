var express = require('express');
var router = express.Router();
var RequestHandler = require('../models/requestHandlers')
var url = require('url');


/*
 sub1 = " line 1";
 sub2 = "second line";
 sub3 = "third line";

 heb1= "שורה ראשונה";
 heb1= "שורה שנייה";
 heb1= "שורה שלישית";

 blocks[];
 blocks[1] = {'en' : sub1, 'heb' : heb1,  couplings : {} };
 blocks[2] = {'en' : sub2, 'heb' : heb2,  couplings : {} };
 blocks[3] = {'en' : sub3, 'heb' : heb3,  couplings : {} };

 */


app.route('/movie:Lesson_id')

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

// Dor Saban API
app.get('/sayso/subs', function(req, res) {
    //lan1 = req.param('lan1');
    //lan1 = req.param('lan2');
    //movie_id = req.param('movie_id'));
    //
    //
    //var subs = {lan1 : {}, lan2 : {}, map1 : {}, map2 : {}};
    //
    //res.json(subs);

});