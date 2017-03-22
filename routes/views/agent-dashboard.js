var keystone = require('keystone');
var User = keystone.list(keystone.get('user model'));

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Product = keystone.list('Product');
	var ProducerTip = keystone.list('ProducerTip');

	var locals = res.locals;
	locals.data = {};

	view.on('init', function(next) {
		ProducerTip.model
			.find()
			.exec()
			.then(function(tips) {
				locals.data.tips = tips;
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
