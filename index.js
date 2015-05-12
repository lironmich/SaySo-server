var dbAPI = require('./dbAPI');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var server = require('./server');
var config = require('./config');
var fs = require('fs');
var mongoose = require('mongoose');


var handle = {}
handle["./"] = requestHandlers.menuHandler;
handle["./menutree"] = requestHandlers.menuHandler;
handle["./xmldb"] = requestHandlers.xmldbHandler;
handle['./card'] = requestHandlers.cardHandler;
handle['defaultHandler'] = requestHandlers.defaultHandler;



// mongoose.connect(config.db.mongodb);
dbAPI.mongoInit();

server.start(router.rout, handle);