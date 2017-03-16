var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'benefits';
	locals.data = {};

	view.on('get', function(next) {
		Product.model.find({
			slug: {
				'$ne': req.session.employer.freeBenefitSlug
			}
		}).exec(function(err, products) {
			locals.data.products = products;
			locals.data.employer = req.session.employer;
			next(err);
		});
	});

	view.on('post', function(next) {
		req.session.employer.additionalBenefitsSlugs = req.body.additionalBenefits;
	});

	view.render('additional-products');
};
