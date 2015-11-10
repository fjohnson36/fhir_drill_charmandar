var passport = require('passport'),
	RememberMeStrategy = require('passport-remember-me').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new RememberMeStrategy(
	  function(token, done) {
		consumeRememberMeToken(token, function(err, uid) {
		  if (err) { return done(err); }
		  if (!uid) { return done(null, false); }

		  User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {
						message: 'Unknown user'
					});
				}

				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}

				return done(null, user);
		  });
		});
	  },
	  issueToken
	));
};

var tokens = {}

function consumeRememberMeToken(token, fn) {
  var uid = tokens[token];
  // invalidate the single-use token
  delete tokens[token];
  return fn(null, uid);
}

function saveRememberMeToken(token, uid, fn) {
  tokens[token] = uid;
  return fn();
}

function issueToken(user, done) {
  var token = utils.randomString(64);
  saveRememberMeToken(token, user.id, function(err) {
    if (err) { return done(err); }
    return done(null, token);
  });
}
