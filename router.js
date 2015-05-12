var querystring = require('querystring');
// var url = require('url');

function rout(handle, pathname, response, postData){	

	var index = 10000;
	var trimmedPath, routedpath = "";
	
	//ove to express
	if(pathname.indexOf("/",2) > 0) index = Math.min(pathname.indexOf("/",2), index);
	if (pathname.indexOf("\\") > 0)	index = Math.min(pathname.indexOf("\\"), index);
	if (pathname.indexOf("?") > 0)	index = Math.min(pathname.indexOf("?"), index);
	
	if (index < 10000){
		trimmedPath = pathname.substr(index+1);
		routedpath = pathname.substr(0, index);
	}
	else{
		routedpath = pathname;
	}

	if (typeof handle[routedpath] === 'function') {
		handle[routedpath](response, querystring.parse(trimmedPath), postData);
	} else {
		handle['defaultHandler'](response, pathname);
	}
}

exports.rout = rout;