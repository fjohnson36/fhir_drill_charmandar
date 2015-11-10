var config = require('../../config/config');
var mongodb = require('mongodb');
var fhir = require('fhir-node');

exports.updateOnWatch = function(req, res) {

	var Patient = require('mongoose').model('Patient');

	var id = '{"id" : "' + req.patientId + '"}';
	var query = JSON.parse(id);

	var u = '{"onWatch" : ""}';
	var updateData =  JSON.parse(u);
	
	if (req.onWatch == 'ifChecked') {
		//u = u.replace('[checked]','checked');
		//u = '{"onWatch : {"' + req.user.username + '" : "checked"}"}';
		//u['onWatch'][req.user.username] = 'checked';
		updateData.onWatch = 'checked'; //JSON.parse('[{' + req.user.username + ' : checked}]');
	} else {
		//u = u.replace('[checked]','');
		//u = '{"onWatch : {"' + req.user.username + '" : ""}"}';
		updateData.onWatch = ''; //JSON.parse('[{' + req.user.username + ': ""}]');
	}
	
	//updateData.username = req.user.username;
	
	console.log(updateData);
		
	Patient.update(query, updateData, { multi: true }, function (err, raw) {
	  if (err) return handleError(err);
	  console.log('The raw response from Mongo was ', raw);
	});
	
	res.send('ok');
};

exports.render = function(req, res) {
	
	var patientData = fhir();
		
	patientData.then(function(seedData){
		console.info('found data');

		mongodb.MongoClient.connect(config.db, function(err, db) {
  
			if(err) throw err;

			console.log("Connected to Database");
			
			
			var patientsdump = db.collection('patientsdump');

			// remove the existing data
			patientsdump.drop(function (err) {
				if(err) console.error(err);
			});


			// bulk insert the new data
			patientsdump.insert(seedData, function(err, result) {
				if(err) console.error(err);
				
				var patients = db.collection('patients');

				// update patient data
				
				patientsdump.find().forEach(function(doc) {

					console.log("patient insert start");
	
					var id = '{"id" : "' + doc.resource.id + '"}';
					var query = JSON.parse(id);
					var o = '{"upsert" : true}';
					var option = JSON.parse(o);

					var updateData =  JSON.parse(id);
					updateData.name = doc.resource.name;
					updateData.firstName = doc.resource.name[0].given[0];
					updateData.lastName = doc.resource.name[0].family[0];
					updateData.middleName = doc.resource.name[0].given[1];
					updateData.gender = doc.resource.gender;
					updateData.birthDate = doc.resource.birthDate;
					updateData.address = doc.resource.address[0].line[0] + ', ' + 
						doc.resource.address[0].city + ', ' + 
						doc.resource.address[0].state;
					updateData.active = doc.resource.active;

					console.log(query);

					patients.update(query, updateData, option, function (err, result) {
						if(err) {
							//throw err;
							console.error(err);
						}
					});


				});
			});

			console.log("patientsdump insertion done");
			
		});


		res.render('index', {
			result: 'ok',
			data: 'patient data pulling success!'
		});
	});
	
};
