var keystone = require('keystone');
var _ = require('lodash');
var ProductService = require('../../services/product-service');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var productService = new ProductService(keystone.list('Product'));

	var locals = res.locals;
	locals.data = {};

	view.on('get', function(next) {

		productService
			.getBenefitsSummary(req.session.employer.freeBenefitSlug,
												  req.session.employer.additionalBenefitsSlugs,
													req.session.employer.numberOfEmployees)
			.then(function(benefitsSummary) {
				locals.data.freeBenefit = benefitsSummary.freeProduct;
				locals.data.additionalBenefits = benefitsSummary.additionalProducts;
				locals.data.totals = benefitsSummary.totals;
				locals.data.employer = req.session.employer;
				next();
			})
			.catch(function(err) {
				next(err);
			});

	});

	view.on('post', function(next) {
		//TODO save everything!
	});

	view.render('summary');
};
