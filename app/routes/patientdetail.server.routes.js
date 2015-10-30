var patient = require('../../app/controllers/patientdetail.server.controller');

module.exports = function(app) {
	app.get('/patientdetail/:patientId/:category', patient.render);
	
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