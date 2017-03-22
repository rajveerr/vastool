var keystone = require('keystone');
var _ = require('lodash');
var ProductService = require('../../services/product-service');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var productService = new ProductService(keystone.list('Product'));

	var locals = res.locals;
	locals.data = {};

	view.on('get', function(next) {
		productService
			.getBenefitsSummary(
				req.session.employer.freeBenefit.slug,
				_.map(req.session.employer.additionalBenefits, 'slug'),
				req.session.employer.numberOfEmployees)
			.then(function(benefitsSummary) {
				locals.data.benefitsSummary = benefitsSummary;
				locals.data.employer = req.session.employer;
				next();
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('summary');
};
