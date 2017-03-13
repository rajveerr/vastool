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
		var offersMajorInsurancePlan = req.body.majorMedicalRadio == 'Yes';
		var newEmployer = {
			name: req.body.employerName,
			numberOfEmployees: req.body.numberOfEmployees,
			averageAgeOfEmployees: req.body.everageAgeOfEmployees,
			offersMajorInsurancePlan: offersMajorInsurancePlan,
			majorInsurancePlan: offersMajorInsurancePlan ? req.body.majorMedicalPlanName : null
		};
		save(newEmployer);
		next();
	});

	function save(employer) {
		Employer.model(employer).save(function(err) {
			if (err) {
				console.log('save failed', err);
				next(err);
			}
		});
	}

	view.render('new-employer');
};
