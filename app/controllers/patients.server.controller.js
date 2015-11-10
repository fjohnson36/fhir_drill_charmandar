var config = require('../../config/config'),
	User = require('mongoose').model('User'),
	passport = require('passport');

exports.render = function(req, res) {
	
	console.log('username: ' + req.user.username);
	
	Patient.find({}, function(err, patients) {
		if (err) {
			return next(err);			
		} else {	
			res.render('patients', {
				title: 'Patient List',
				data: patients,
				pagetype: 'patients',
				userid: req.user.username,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
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
