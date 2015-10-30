var alert = require('../../app/controllers/alert.server.controller');
		
module.exports = function(app) {
	
	app.get('/alert', alert.render);
	
};