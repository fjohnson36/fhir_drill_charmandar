var patient = require('../controllers/patientdetail.server.controller'),
	utils = require('./utils');

module.exports = function(app) {
	app.get('/patientdetail/:patientId/:category', utils.ensureAuthenticated, patient.render);
	
	app.route('/patient/:patientId')
		.get(patient.read)
		.put(patient.update)
		.delete(patient.delete);
	

	app.param('patientId', function(req, res, next, patientId) {
		req.patientId = patientId;

		next();
	});
	
	app.param('category', function(req, res, next, category) {
		req.category = category;

		next();
	});
};
