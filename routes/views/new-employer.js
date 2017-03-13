var keystone = require('keystone');
var Employer = keystone.list('Employer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';

  view.on('init', function(next) {
		next();
  });

	view.on('post', function(next) {
		Employer.model({
			name: req.body.employerName,
			numberOfEmployees: req.body.numberOfEmployees,
			averageAgeOfEmployees: req.body.everageAgeOfEmployees,
			offersMajorInsurancePlan: req.body.majorMedicalRadio == 'Yes'
		}).save(function(err) {
			if (err) {
				console.log('new-employer post failed!', err);
				next(err);
			}
		});

		next();
	});

	view.render('new-employer');
};
