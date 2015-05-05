var dbAPI = require('./dbAPI');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var server = require('./server');

var handle = {}
handle["./"] = requestHandlers.menuHandler;
handle["./menu.html"] = requestHandlers.menuHandler;
handle["./xmldb"] = requestHandlers.xmldbHandler;
handle['defaultHandler'] = requestHandlers.defaultHandler;

server.start(router.rout, handle);