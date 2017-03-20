var _ = require('lodash');

var ProductService = function(Product) {

  this.getBenefitsSummary = function(freeProductSlug,
                                     additionalProductSlugs,
                                     numberOfEmployees) {
    var slugs = [].concat(freeProductSlug)
                  .concat(additionalProductSlugs);

    return Product.model.find({
  		slug: {
  			$in : slugs
  		}
  	})
    .exec()
    .then(function(products) {
      var freeProduct = _.find(products, ['slug', freeProductSlug]);
      var additionalProducts = _.difference(products, [freeProduct]);
      var totalPerEmployeePerMonth = parseFloat(_.sumBy(additionalProducts, 'price'));
      var premium = totalPerEmployeePerMonth * numberOfEmployees;

      return benefitsSummary = {
        freeBenefit: freeProduct,
        additionalBenefits: additionalProducts,
        totals: {
          perEmployeePerMonth: parseFloat(totalPerEmployeePerMonth.toFixed(2)),
          premium : parseFloat(premium.toFixed(2))
        }
      };
    });
  }

};

module.exports = ProductService;
