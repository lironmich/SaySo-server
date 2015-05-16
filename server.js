var express      = require('express');        
var app          = express();                
var bodyParser   = require('body-parser');
var path 	     = require('path');
var favicon      = require('serve-favicon');
var logger 	     = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());

var routes = require('./routes/index');
var userRoutes = require('./routes/users');
var apiRoutes = require('./routes/api');

var router = express.Router();  
var port = process.env.PORT || 8888;       

app.use('/api', apiRoutes);
app.use('/', routes);
app.use('/users', userRoutes);

router.get('/t', function(req, res) {
   res.json({ message: 'hooray! welcome to our Index!' }); 
});

// START THE SERVER
app.listen(port);
console.log('Server started on port ' + port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;


// need to:


// get methodes SOUP
// =============
// on relevant request - send full list of Curriculum's
// on relevant request with Curriculum's ID - send list of lessons
// on relevant request with lessons ID - send list of records

// for start - save list of records and supply random one to user

// set methodes
// =============
// Make web page to produce new Curriculum/ lessons/ records

