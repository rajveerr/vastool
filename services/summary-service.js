var _ = require('lodash');
var BenefitsSummary = require('../models/domain/BenefitsSummary');

var SummaryService = function(Product) {

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

      return new BenefitsSummary(freeProduct, additionalProducts, numberOfEmployees);
    });
  }

};

module.exports = SummaryService;
