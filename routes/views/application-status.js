var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Employer = keystone.list('Employer');

	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Employer.model
			.findOne({slug: req.params.slug})
			.exec()
			.then(function(employer) {
				locals.data.employer = employer;
				next();
			})
			.catch(function(err) {
				next(err)
			});
	});

	view.on('post', function(next) {
			Employer.model
				.findOneAndUpdate({
					slug: req.params.slug
				}, {
					selectedBenefits: req.body.selectedBenefits == 'Yes',
					applicationSubmitted: req.body.applicationSubmitted == 'Yes',
					popsDone: req.body.popsDone == 'Yes',
					notesFromProducer: req.body.notesFromProducer
				})
				.then(function() {
					res.redirect('/agent-dashboard');
				})
				.catch(function(err) {
					next(err)
				});
	});

	view.render('application-status');
};
