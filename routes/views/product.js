var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	
	var locals = res.locals;
  locals.filters = {
    productSlug: req.params.product
  };
  locals.data = {
    product: {}
  };

  view.on('init', function(next) {
    Product.model.findOne({
      slug: locals.filters.productSlug
    }).exec(function(err, product) {
      locals.data.product = product;
      next(err);
    });
  });

	view.render('product');
};
