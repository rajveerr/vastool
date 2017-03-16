var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'benefits';

	// Load products
	view.query('products', Product.model.find({
		free: true
	}));

	view.on('post', function(next) {
		req.session.employer.freeBenefitSlug = req.body.freeBenefit;
		res.redirect('additional-products');
	});

	view.render('free-products');
};
