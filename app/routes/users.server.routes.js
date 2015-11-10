var users = require('../controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/user/signup')
		.get(users.renderSignup)
		.post(users.signup);
	
	app.route('/user/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successReturnToOrRedirect: '/',
			failureRedirect: '/user/signin',
			failureFlash: true
		}),	function(req, res, next) {
			// issue a remember me cookie if the option was checked
			if (!req.body.remember_me) { return next(); }

			var day = 24 * 60 * 60 * 1000;
			res.cookie('charmander-userid', req.body.username, { maxAge: day });
		
		
			issueToken(req.user, function(err, token) {
      			if (err) { return next(err); }
      			res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
      			return next();
    		});
		
		});
	
	app.get('/signout', users.signout);
	
	
	app.route('/users')
		.post(users.create)
		.get(users.list);
	
	app.route('/user/:userId')
		.get(users.read);
	
	app.param('userId', users.userByID);
};
