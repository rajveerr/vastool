var _ = require('lodash');

var OrderSummary = function(freeProduct,
                            additionalProducts,
                            numberOfEmployees) {

  this.freeBenefit = freeProduct;
  this.additionalBenefits = additionalProducts;
  this.numberOfEmployees = numberOfEmployees;

  this.totalPerEmployeePerMonth = parseFloat(_.sumBy(this.additionalBenefits, 'price'));
  this.premium = this.totalPerEmployeePerMonth * this.numberOfEmployees;

  this.totals = {
    perEmployeePerMonth: parseFloat(this.totalPerEmployeePerMonth.toFixed(2)),
    premium : parseFloat(this.premium.toFixed(2))
  };

};

module.exports = OrderSummary;
