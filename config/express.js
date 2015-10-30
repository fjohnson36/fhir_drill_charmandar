var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

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
		resave: true,
		secret: config.sessionSecret
	}));
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use('/static', express.static('./public'));

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/login.server.routes.js')(app);
	require('../app/routes/lock.server.routes.js')(app);
	require('../app/routes/register.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/patients.server.routes.js')(app);
	require('../app/routes/patientdetail.server.routes.js')(app);
	require('../app/routes/alert.server.routes.js')(app);
	
	
	return app;
};