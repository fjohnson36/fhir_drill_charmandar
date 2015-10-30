var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PatientSchema = new Schema({
	id: {
		type: String,
		unique: true
	},
	firstName: String,
	lastName: String,
	middleName: String,
	gender: String,
	address: String,
	birthDate: String,
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Patient', PatientSchema);