exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	req.session.returnTo = req.url;	

	if (!req.user) res.redirect('/user/signin');
	
	console.log('username: ' + req.user.username);
	
	res.render('lockscreen', {
		title: 'Lock Screen',
		result: '',
		data: '',
		username: req.user.firstName + ' ' + req.user.lastName,
		userid: req.user.username,
		sessionTimeOut: 'no'
	})
};
