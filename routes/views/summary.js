var keystone = require('keystone');
var _ = require('lodash');
var SummaryService = require('../../services/summary-service');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var summaryService = new SummaryService(keystone.list('Product'));

	var locals = res.locals;
	locals.data = {};

	view.on('get', function(next) {
		summaryService
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
