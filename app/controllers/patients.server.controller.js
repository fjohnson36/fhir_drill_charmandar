exports.render = function(req, res) {
	Patient.find({}, function(err, patients) {
		if (err) {
			return next(err);			
		} else {			
			res.render('patients', {
				data: patients,
				pagetype: 'patients'
			});
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
