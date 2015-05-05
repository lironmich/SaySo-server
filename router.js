
function rout(handle, pathname, response){	
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response);
	} else {
		handle['defaultHandler'](response, pathname);
	}
}

exports.rout = rout;