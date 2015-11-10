var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function() {
	var app = express();
	
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		rolling: true,
		resave: true,
		secret: config.sessionSecret,
        cookie: { maxAge : 60000 } //1 Hour   3600000
	}));
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	//app.use(passport.authenticate('remember-me'));
	
	app.use('/static', express.static('./public'));

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/lock.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/patients.server.routes.js')(app);
	require('../app/routes/patientdetail.server.routes.js')(app);
	require('../app/routes/alert.server.routes.js')(app);
	
	return app;
};
