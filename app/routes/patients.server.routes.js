var patients = require('../controllers/patients.server.controller'),
	dbmgr = require('../controllers/mongodb.server.controller'),
	utils = require('./utils');

module.exports = function(app) {
	app.get('/patientlist', utils.ensureAuthenticated, patients.render);
	
	app.get('/patientsupdate', utils.ensureAuthenticated, dbmgr.render);
	
	app.route('/patients')
		.post(patients.create)
		.get(patients.list);
	
	app.get('/patient/:patientId/:onWatch', utils.ensureAuthenticated, dbmgr.updateOnWatch);
	
	app.param('patientId', function(req, res, next, patientId) {
		req.patientId = patientId;

		next();
	});
	
	app.param('onWatch', function(req, res, next, onWatch) {
		req.onWatch = onWatch;

		next();
	});
};
