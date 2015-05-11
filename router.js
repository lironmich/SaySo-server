
function rout(handle, pathname, response, postData){	
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		handle['defaultHandler'](response, pathname);
	}
}

exports.rout = rout;