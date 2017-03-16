var keystone = require('keystone');
var Employer = keystone.list('Employer');

exports = module.exports = function (req, res) {

  //TODO get this from the database
	var MEDICAL_PLANS = [
		'Blue Cross Blue Shield of Georgia'
	];

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';
	locals.data = {};

  view.on('init', function(next) {
		locals.data.medicalPlans = MEDICAL_PLANS;

		next();
  });

	view.on('post', function(next) {
		var newEmployer = newEmployerFromRequest();
		req.session.employer = newEmployer;
		res.redirect('free-products');
	});

	function newEmployerFromRequest() {
		var offersMajorInsurancePlan = req.body.majorMedicalRadio == 'Yes';
		return {
			name: req.body.employerName,
			numberOfEmployees: req.body.numberOfEmployees,
			averageAgeOfEmployees: req.body.everageAgeOfEmployees,
			offersMajorInsurancePlan: offersMajorInsurancePlan,
			majorInsurancePlan: offersMajorInsurancePlan ? req.body.majorMedicalPlanName : null
		};
	}

	view.render('new-employer');
};
