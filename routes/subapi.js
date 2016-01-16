
// Mock for Dor
 sub1 = {"00:00:18,578 --> 00:00:19,963" : "first line "};
 sub2 = {"00:00:19,993 --> 00:00:21,265" : "second line"};
 sub3 = {"00:00:21,380 --> 00:00:22,903" : "third line"};

 he_tr_en1= {"00:00:18,578 --> 00:00:19,963" : "shura rishona"};
 he_tr_en2= {"00:00:19,993 --> 00:00:21,265" : "shura shniya"};
 he_tr_en3= {"00:00:21,380 --> 00:00:22,903" : "shura shlishit"};

 heb1= {"00:00:18,578 --> 00:00:19,963" : "שורה ראשונה"};
 heb2= {"00:00:19,993 --> 00:00:21,265" : "שורה שנייה"};
 heb3= {"00:00:21,380 --> 00:00:22,903" : "שורה שלישית"};

 blocks=[];
 blocks[0] = {'en' : sub1, 'heb' : heb1,  couplings : [ ["שורה", "line", "shura"], ["second", "ראשונה", "rishona"] ] };
 blocks[1] = {'en' : sub2, 'heb' : heb2,  couplings : [ ["שורה", "line", "shura"], ["second", "שנייה", "shniya"] ]  };
 blocks[2] = {'en' : sub3, 'heb' : heb3,  couplings : [ ["שורה", "line", "shura"], ["second", "שלישית", "shlishit"] ]  };


var mongodata = require('../models2/mongoAPI');
//var api = require('./api');
//var JSONAPI = require('../models/JSONAPI');
//var models = require('../models2/models');
//var util = require('util');

module.exports = function(app, passport) {



    app.get('/tester', function(req, res) {
        res.render('cards.html');
        // res.json(blocks);
        // mongodata.Tester(res);
    });



    // get / set movie = movie=id / new

    app.get('/cliplist', function(req, res) {
        mongodata.clipList(res);
    });

    app.route('/teacher')
        .get (function(req, res) {
            res.render('teacher.html');
        })


    // full movie
    // http://127.0.0.1:8888/movie/2424?lan1=he&lan2=en&lan3=tr
    app.get('/movie/:movie_id', function(req, res) {

        id = req.params.movie_id;
        lan1 = req.query.lan1;
        lan2 = req.query.lan2;
        lan3 = req.query.lan3;

        console.log("app.route('/movie/:Movie_id') : lan3 = " + lan3);
        res.json(blocks);
    });


    //  http://127.0.0.1:8888/teacher/movie/2424?lan1=he&lan2=en&lan3=tr
    app.route('/teacher/movie/:movie_id')

        .get(function(req, res) {

            id = req.params.movie_id;
            lan1 = req.query.lan1;
            lan2 = req.query.lan2;
            lan3 = req.query.lan3;

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
