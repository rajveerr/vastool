var keystone = require('keystone');
var Product = keystone.list('Product');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Product.model
			.find()
			.exec()
			.then(function(products) {
				var freeProduct = _.find(products, ['slug', req.session.employer.freeBenefitSlug]);
				locals.data.additionalProducts = _.difference(products, [freeProduct]);
				locals.data.freeProduct = freeProduct;
				locals.data.employer = req.session.employer;
				next();
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.on('post', function(next) {
		req.session.employer.additionalBenefitsSlugs = req.body.additionalBenefits;
		res.redirect('summary');
	});

	view.render('additional-products');
};
