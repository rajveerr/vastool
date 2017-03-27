var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var Product = keystone.list('Product');
	var Employer = keystone.list('Employer');

	locals.data = {};

	view.on('get', function(next) {
		Employer.model
			.findOne({slug: req.params.slug})
			.exec()
			.then(function(employer) {
				locals.data.employer = req.session.employer = employer;

				Product.model
					.find()
					.exec()
					.then(function(allProducts) {
						locals.data.products = allProducts;
						next();
					});
			})
			.catch(function(err) {
				next(err);
			});
	});

	view.on('post', function(next) {
		fetchSelectedBenefits(req.body.preferredBenefits)
			.then(function(products) {
				var selectedBenefits = _.map(products, function(product) {
					return _.pick(product, ['slug', 'title', 'price']);
				});
				var newPreferredBenefits = {
					datetime: new Date(),
					preferredBenefits: selectedBenefits
				};

				Employer.model
					.findOne({slug: req.params.slug}, updatePreferredBenefits(newPreferredBenefits, next));
			})
			.catch(function(err) {
				next(err);
			});
	});

	function fetchSelectedBenefits(selectedBenefits) {
		return Product.model
			.find({
				slug: {
					$in: selectedBenefits
				}
			})
			.exec();
	}

	function updatePreferredBenefits(newPreferredBenefits, next) {
		return function(err, employer) {
			var preferredBenefits;
			if (employer.employeePreferredBenefits) {
				preferredBenefits = JSON.parse(employer.employeePreferredBenefits);
			} else {
				preferredBenefits = [];
			}
			preferredBenefits.push(newPreferredBenefits);
			employer.employeePreferredBenefits = JSON.stringify(preferredBenefits);
			employer.save(function(err) {
				if (err) next(err);
				res.redirect('/thank-you');
			});
		}
	}

	view.render('employee-preference');
};
