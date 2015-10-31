var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) 
				message = err.errors[errName].message;
		}
	}
	
	return message;
};

exports.renderSignin = function(req, res, next) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	if (!req.user) {
		
		res.render('signin', {
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		
		return res.redirect(req.pagetogo, { 
			user : req.user 
		});
	}
};

exports.renderSignup = function(req, res, next) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	if (!req.user) {
		res.render('signup', {
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
}

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		
		user.provider = 'local';
		
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				
				req.flash('error', message);
				return res.redirect('/signup');
			}
			
			req.login(user, function(err) {
				if (err) return next(err);
				
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next) {
	var user = new User(req.body);
	
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);			
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};