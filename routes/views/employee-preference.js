var keystone = require('keystone');
var Product = keystone.list('Product');
var _ = require('lodash');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Product.model
			.find()
			.exec()
			.then(function(allProducts) {
				locals.data.products = allProducts;
				locals.data.employer = req.session.employer;
				next();
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.on('post', function(next) {
		Product.model
			.find({
				slug: {
					$in: req.body.employeeProducts
				}
			})
			.exec()
			.then(function(products) {
				req.session.employer.employeeProducts =
					_.map(products, function(product) {
						return _.pick(product, ['slug', 'title', 'price']);
					});
				res.redirect('thank-you');
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('employee-preference');
};
