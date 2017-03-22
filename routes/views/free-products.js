var keystone = require('keystone');
var Product = keystone.list('Product');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {};

	view.on('get', function(next) {
		Product.model.find({
			free: true
		})
		.exec(function(err, products) {
			locals.data.products = products;
			locals.data.employer = req.session.employer;
			next(err);
		});
	});

	view.on('post', function(next) {
		Product.model.findOne({
			slug: req.body.freeBenefit
		})
		.exec()
		.then(function(freeProduct) {
			req.session.employer.freeBenefit = _.pick(freeProduct, ['slug', 'title', 'price']);
			res.redirect('additional-products');
		})
		.catch(function(err) {
			next(err);
		});
	});

	view.render('free-products');
};
