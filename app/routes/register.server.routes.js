var register = require('../../app/controllers/register.server.controller');
		
module.exports = function(app) {
	
	app.get('/register', register.render);
	
};