var chai = require('chai');
var sinon = require('sinon');
var BenefitsSummary = require('../../../../models/domain/BenefitsSummary');
var expect = chai.expect;

describe('BenefitsSummary', function() {

  var numberOfEmployees = 10;

  it('should return total of all benefits', function() {
    var freeProduct = {slug: 'free1'};
    var additionalProducts = [
      {slug: 'add1', price: 0.21},
      {slug: 'add2', price: 0.80},
      {slug: 'add3', price: 1.13}
    ];
    var benefitsSummary = new BenefitsSummary(freeProduct, additionalProducts, numberOfEmployees);

    expect(benefitsSummary.totals).to.not.be.undefined;
    expect(benefitsSummary.totals.perEmployeePerMonth).to.be.eql(2.14);
    expect(benefitsSummary.totals.premium).to.be.eql(21.40);
  });

});
