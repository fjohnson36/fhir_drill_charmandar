var User = require('mongoose').model('User'),
	passport = require('passport');

exports.render = function(req, res) {
	
	var patient_id = req.patientId;
	var category = req.category;
	
	if (category == 'observation') {
		
		if (!req.user) {
			req.session.returnTo = '/patientdetail/' + patient_id + '/observation';
				
			res.render('signin', {
				messages: ''
			});
		} else {
			res.render('patientobservation', {
				title: 'Patient Observations',
				id: patient_id,
				pagetype: 'patientobservation'
			});
		}
		
		
	} else if (category == 'condition') {
		if (!req.user) {
			req.session.returnTo = '/patientdetail/' + patient_id + '/condition';
				
			res.render('signin', {
				messages: ''
			});
		} else {
			res.render('patientcondition', {
				title: 'Patient Conditions',
				id: patient_id,
				pagetype: 'patientcondition'
			});
		}
	}
};

var Patient = require('mongoose').model('Patient');

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

exports.read = function(req, res) {
	res.json(req.patient);
};

exports.patientByID = function(req, res, next, id) {
	Patient.findOne({
		id: id
	}, function(err, patient) {
		if (err) {
			return next(err);
		} else {
			req.patient = patient;
			next();
		}
	});
};

exports.update = function(req, res, next) {
	Patient.findByIdAndUpdate(req.patient.id, req.body, function(err, patient) {
		if (err) {
			return next(err);
		} else {
			res.json(patient);
		}
	});
};

exports.delete = function(req, res, next) {
	req.patient.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.patient);
		}
	});
};