var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Employer = keystone.list('Employer');

	var locals = res.locals;

	locals.data = {};

	view.on('init', function(next) {
		next();
	});

	view.render('application-status');
};
