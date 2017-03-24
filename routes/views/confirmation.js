var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Employer = keystone.list('Employer');

	var locals = res.locals;
	locals.data = {};

	view.on('post', function(next) {
		var employer = req.session.employer;

		var employer = new Employer.model({
			name: employer.name,
			numberOfEmployees: employer.numberOfEmployees,
			averageAgeOfEmployees: employer.averageAgeOfEmployees,
			offersMajorInsurancePlan: employer.offersMajorInsurancePlan,
			majorInsurancePlan: employer.majorInsurancePlan,
			newMajorMedicalPlanName: employer.newMajorMedicalPlanName,
			freeBenefit: JSON.stringify(employer.freeBenefit),
			additionalBenefits: JSON.stringify(employer.additionalBenefits),
			popsEngagement: req.body.popsEngagement,
			userId: req.session.user.userID
		});

		employer.save(function(err) {
			locals.data.employer = req.session.employer;
			next(err);
		});
	});

	view.render('confirmation');
};
