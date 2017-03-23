var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Product = keystone.list('Product');
	var ProducerTip = keystone.list('ProducerTip');

	var locals = res.locals;
	locals.data = {};

	view.on('init', function(next) {
		ProducerTip.model
			.find()
			.sort({date: 'desc'})
			.exec()
			.then(function(tips) {
				locals.data.tips = _.map(tips, 'slug');
			});

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
