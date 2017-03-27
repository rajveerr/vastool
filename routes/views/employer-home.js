var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('init', function(next) {
		console.log('employerSlug:', req.session.user.employerSlug);
		next();
	});

	view.render('employer-home');
};
