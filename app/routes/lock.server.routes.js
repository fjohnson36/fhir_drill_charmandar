var lock = require('../../app/controllers/lock.server.controller');
		
module.exports = function(app) {
	
	app.get('/lock', lock.render);
	
};