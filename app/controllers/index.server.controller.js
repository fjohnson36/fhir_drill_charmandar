var User = require('mongoose').model('User'),
	passport = require('passport');

exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	res.render('index', {
		title: 'Hello World',
		result: '',
		data: '',
		userid: '',
		sessionTimeOut: 'no'
	});
	
};
