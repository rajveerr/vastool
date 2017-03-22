var keystone = require('keystone');
var Product = keystone.list('Product');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Product.model
			.find({
				slug: {
					'$ne': req.session.employer.freeBenefit.slug
				}
			})
			.exec()
			.then(function(products) {
				locals.data.additionalProducts = products;
				locals.data.freeProduct = req.session.employer.freeBenefit;
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
					$in: req.body.additionalBenefits
				}
			})
			.exec()
			.then(function(additionalProducts) {
				req.session.employer.additionalBenefits =
					_.map(additionalProducts, function(additionalProduct) {
						return _.pick(additionalProduct, ['slug', 'title', 'price']);
					});
				res.redirect('summary');
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('additional-products');
};
