var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'benefits';
  locals.filters = {
    productId: req.params.product
  };
  locals.data = {
    product: {}
  };

  view.on('init', function(next) {
    console.log('>> loading product ' + locals.filters.productId);
    Product.model.findOne({
      id: locals.filters.productId
    }).exec(function(err, result) {
      locals.data.product = result;
      next(err);
    });
  });

	view.render('product');
};
