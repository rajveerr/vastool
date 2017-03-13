var keystone = require('keystone');
var Employer = keystone.list('Employer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';

  view.on('init', function(next) {
		console.log('here!');
		next();
  });

	view.render('new-employer');
};
