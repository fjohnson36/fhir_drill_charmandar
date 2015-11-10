var lock = require('../controllers/lock.server.controller'),
	passport = require('passport');
		
module.exports = function(app) {
	
	app.get('/user/lock', lock.render);
	
};
