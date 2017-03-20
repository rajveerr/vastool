var chai = require('chai');
var sinon = require('sinon');
require('sinon-mongoose');
require('sinon-as-promised');
var expect = chai.expect;

var keystone = require('keystone');
var ProductService = require('../../../services/product-service');

describe('product-service', function() {

  var Product;
  var productService;
  var numberOfEmployees = 10;

  beforeEach(function() {
    Product = keystone.list('Product');
    productService = new ProductService(Product);
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

      return productService
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

      return productService
        .getBenefitsSummary(freeProduct, additionalProducts, numberOfEmployees)
        .then(function(benefitsSummary) {
          expect(benefitsSummary.freeProduct).to.not.be.undefined;
          expect(benefitsSummary.additionalProducts).to.not.be.undefined;
          expect(benefitsSummary.additionalProducts).to.have.length(2);
          expect(benefitsSummary.additionalProducts[0].slug).to.be.eql('add1');
          expect(benefitsSummary.additionalProducts[1].slug).to.be.eql('add2');
        });
    });

    it('should return total of all benefits', function() {
      var freeProduct = 'free1';
      var additionalProducts = ['add1', 'add2', 'add3'];

      sinon.mock(Product.model)
        .expects('find').withArgs({slug: {$in: ['free1', 'add1', 'add2', 'add3']} })
        .chain('exec')
        .resolves([
          {slug: 'free1'},
          {slug: 'add1', price: 0.21},
          {slug: 'add2', price: 0.80},
          {slug: 'add3', price: 1.13}
        ]);

      return productService
        .getBenefitsSummary(freeProduct, additionalProducts, numberOfEmployees)
        .then(function(benefitsSummary) {
          expect(benefitsSummary.totals).to.not.be.undefined;
          expect(benefitsSummary.totals.perEmployeePerMonth).to.be.eql(2.14);
          expect(benefitsSummary.totals.premium).to.be.eql(21.40);
        });
    });

  });

});
