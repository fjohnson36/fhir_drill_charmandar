exports.render = function(req, res) {
	Patient.find({}, function(err, patients) {
		if (err) {
			return next(err);			
		} else {	
			if (!req.user) {
				req.session.returnTo = '/patientlist';

				res.render('signin', {
					messages: ''
				});
			} else {
				res.render('patients', {
					title: 'Patient List',
					data: patients,
					pagetype: 'patients'
				});
			}
		}
	});
};

var Patient = require('mongoose').model('Patient');

exports.list = function(req, res, next) {
	Patient.find({}, function(err, patients) {
		if (err) {
			return next(err);			
		} else {			
			res.json(patients);		
		}
	});
};

exports.create = function(req, res, next) {
	var patient = new Patient(req.body);
	
	patient.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(patient);
		}
	});
};
