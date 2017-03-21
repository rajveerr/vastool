var keystone = require('keystone');
var User = keystone.list(keystone.get('user model'));
var Product = keystone.list('Product');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';
	locals.data = {};

	view.on('init', function(next) {
		next();
	});

	view.on('get', function(next) {
		Product.model.find().exec(function(err, products) {
			locals.data.products = products;
			next(err);
		});
	});

	view.render('agent-dashboard');
};
