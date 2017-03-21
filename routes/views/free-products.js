var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Product.model.find({
			free: true
		}).exec(function(err, products) {
			locals.data.products = products;
			locals.data.employer = req.session.employer;
			next(err);
		});
	});

	view.on('post', function(next) {
		req.session.employer.freeBenefitSlug = req.body.freeBenefit;
		res.redirect('additional-products');
	});

	view.render('free-products');
};
