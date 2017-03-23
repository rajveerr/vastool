var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Product = keystone.list('Product');
	var Employer = keystone.list('Employer');
	var ProducerTip = keystone.list('ProducerTip');

	var locals = res.locals;
	locals.data = {};

	function fetchProducts() {
		return Product.model
			.find()
			.exec();
	}

	function fetchEmployersFor(userId) {
		return Employer.model
			.find({ userId: userId })
			.exec();
	}

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
		fetchProducts()
			.then(function(products) {
				locals.data.products = products;

				return
					fetchEmployersFor(req.session.user.userID)
					.then(function(employers) {
						locals.data.employers = employers;
						next();
					});
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('agent-dashboard');
};
