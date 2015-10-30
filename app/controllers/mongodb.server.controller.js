var config = require('../../config/config');
var mongodb = require('mongodb');
var fhir = require('fhir-node');

exports.render = function(req, res) {
	
	var patientData = fhir();
		
	patientData.then(function(seedData){
		console.info('found data');

		mongodb.MongoClient.connect(config.db, function(err, db) {
  
			if(err) throw err;
						
		  	var patients = db.collection('patients');

			// remove the existing data
			patients.drop(function (err) {
				if(err) throw err;
			});

			
			// bulk insert the new data
		  	patients.insert(seedData, function(err, result) {

				if(err) throw err;

		  	});
			
		});


		res.render('index', {
			result: 'ok',
			data: 'patient data pulling success!'
		});
	});
	
};