var keystone = require('keystone');
var User = keystone.list(keystone.get('user model'));
var Employer = keystone.list('Employer');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';
	locals.data = {};

	view.on('init', function(next) {
		next();
	});

	view.on('post', function(next) {
		var newEmployer = startNewEmployer();
		req.session.employer = newEmployer;
		req.session.user = res.locals.user = user;
		res.redirect('free-products');
	});

	function startNewEmployer() {
		return {
			name: req.body.employerName
		};
	}

	view.render('agent-dashboard');
};
