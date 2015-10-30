var login = require('../../app/controllers/login.server.controller');
		
module.exports = function(app) {
	
	app.get('/login', login.render);
	
};