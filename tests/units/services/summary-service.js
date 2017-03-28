var chai = require('chai');
var sinon = require('sinon');
require('sinon-mongoose');
require('sinon-as-promised');
var expect = chai.expect;

var keystone = require('keystone');
var SummaryService = require('../../../services/summary-service');

describe('SummaryService', function() {

  var Product;
  var summaryService;
  var numberOfEmployees = 10;

  beforeEach(function() {
    Product = keystone.list('Product');
    summaryService = new SummaryService(Product);
  });

  afterEach(function() {
    Product.model.find.restore();
  });

  describe('.getBenefitsSummary', function() {

    it('should concat all slugs and fetch the products', function() {
      var freeProducts = ['free1'];
      var additionalProducts = ['add1', 'add2', 'add3'];

      sinon.mock(Product.model)
        .expects('find').withArgs({slug: {$in: ['free1', 'add1', 'add2', 'add3']} })
        .chain('exec')
        .resolves([
          {slug: 'free1'},
          {slug: 'add1'},
          {slug: 'add2'},
          {slug: 'add3'},
        ]);

      return summaryService
          .getBenefitsSummary(freeProducts, additionalProducts, numberOfEmployees)
          .then(function(benefitsSummary) {
              expect(benefitsSummary).to.not.be.undefined;
          });
    });

    it('should return free product AND additional products separately', function() {
      var freeProduct = 'free1';
      var additionalProducts = ['add1', 'add2'];

      sinon.mock(Product.model)
        .expects('find').withArgs({slug: {$in: ['free1', 'add1', 'add2']} })
        .chain('exec')
        .resolves([
          {slug: 'free1'},
          {slug: 'add1'},
          {slug: 'add2'}
        ]);

      return summaryService
        .getBenefitsSummary(freeProduct, additionalProducts, numberOfEmployees)
        .then(function(benefitsSummary) {
          expect(benefitsSummary.freeBenefit).to.not.be.undefined;
          expect(benefitsSummary.additionalBenefits).to.not.be.undefined;
          expect(benefitsSummary.additionalBenefits).to.have.length(2);
          expect(benefitsSummary.additionalBenefits[0].slug).to.be.eql('add1');
          expect(benefitsSummary.additionalBenefits[1].slug).to.be.eql('add2');
        });
    });

  });

});
