var keystone = require('keystone');
var _ = require('lodash');
var PreferredBenefits = require('../../models/domain/PreferredBenefits');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var Employer = keystone.list('Employer');

	locals.data = {};

	view.on('init', function(next) {
		Employer.model
			.findOne({slug: req.session.user.employerSlug})
			.then(function(employer) {
				var preferredBenefits = new PreferredBenefits(employer.getEmployeePreferredBenefitsAsJson());
				locals.data.preferredBenefitsRanking = preferredBenefits.rank();

				next();
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('employer-home');
};
