var dbAPI = require('./dbAPI');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var server = require('./server');
var config = require('./config');
var fs = require('fs');
var mongoose = require('mongoose');


var handle = {} // change to express router.
handle["./"] = requestHandlers.menuHandler;
handle["./menutree"] = requestHandlers.menuHandler;
handle["./xmldb"] = requestHandlers.xmldbHandler;
handle['./card'] = requestHandlers.cardHandler;
handle['defaultHandler'] = requestHandlers.defaultHandler;
//start script command npm

// handle get NextCard - redirect to one of the collected cards
// post from menu - selected cards - 

// handle post curiculum
// handle post add Card
// handle post update Card




// make unsorted curicuilum. add to the and than sort from edit page

//mongoose.connect(config.db.mongodb);
dbAPI.mongoInit();

server.start(router.rout, handle);