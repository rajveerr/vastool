var _ = require('lodash');

var ProductService = function(Product) {

  this.getBenefitsSummary = function(freeProductSlug,
                                     additionalProductSlugs,
                                     numberOfEmployees,
                                     callback) {
    var slugs = [].concat(freeProductSlug)
                  .concat(additionalProductSlugs);

    Product.model.find({
  		slug: {
  			$in : slugs
  		}
  	}).exec(function(err, products) {
      var freeProduct = _.find(products, ['slug', freeProductSlug]);
      var additionalProducts = _.difference(products, [freeProduct]);
      var totalPerEmployeePerMonth = parseFloat(_.sumBy(additionalProducts, 'price'));
      var premium = totalPerEmployeePerMonth * numberOfEmployees;
      var benefitsSummary = {
        freeProduct: freeProduct,
        additionalProducts: additionalProducts,
        totals: {
          perEmployeePerMonth: parseFloat(totalPerEmployeePerMonth.toFixed(2)),
          premium : parseFloat(premium.toFixed(2))
        }
      };
      callback(err, benefitsSummary);
    });
  }

};

module.exports = ProductService;
