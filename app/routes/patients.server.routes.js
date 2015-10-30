var patients = require('../../app/controllers/patients.server.controller');
var dbmgr = require('../../app/controllers/mongodb.server.controller');

module.exports = function(app) {
	app.get('/patientlist', patients.render);
	
	app.get('/patientsupdate', dbmgr.render);
	
	app.route('/patients')
		.post(patients.create)
		.get(patients.list);
	
};