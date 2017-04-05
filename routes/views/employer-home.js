var keystone = require('keystone');
var _ = require('lodash');
var PreferredBenefits = require('../../models/domain/PreferredBenefits');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var Product = keystone.list('Product');
	var locals = res.locals;
	var Employer = keystone.list('Employer');

	var locals = res.locals;
	locals.data = {};

	function fetchProducts() {
		return Product.model
			.find()
			.exec();
	}

	view.on('init', function(next) {
		Employer.model
			.findOne({slug: req.session.user.employerSlug})
			.then(function(employer) {
				if (employer && employer.employeePreferredBenefits) {
					var preferredBenefits = new PreferredBenefits(employer.getEmployeePreferredBenefitsAsJson());
					locals.data.preferredBenefitsRanking = preferredBenefits.rank();
				} else {
					locals.data.preferredBenefitsRanking = [];
				}
				next();
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.on('get', function(next) {
		fetchProducts()
			.then(function(products) {
				locals.data.products = products;
				fetchEmployersFor(req.session.user.userID)
					.then(function(employers) {
						locals.data.employers = employers;
						next();
					});
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.render('employer-home');
};
