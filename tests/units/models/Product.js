var chai = require('chai');
var expect = chai.expect;
var keystone = require('keystone');

describe('Product', function() {

  var Product;

  beforeEach(function() {
    Product = keystone.list('Product');
  });

  describe('.getServicesIncludedAsArray', function() {

    it('should return empty array if services included is undefined', function() {
      var product = new Product.model({});
      var servicesIncluded = product.getServicesIncludedAsArray();
      expect(servicesIncluded).to.eql([]);
    });

    it('should split services included by delimiter', function() {
      var product = new Product.model({
        servicesIncluded: 'Understand their coverage and costs of care# Locating leading providers, including for second opinions#Clarifying complex conditions#'
      });
      var servicesIncluded = product.getServicesIncludedAsArray();
      expect(servicesIncluded).to.have.lengthOf(3);
      expect(servicesIncluded[0]).to.eql('Understand their coverage and costs of care');
    });

  });

  describe('.getBenefitsForEmployeesAsArray', function() {

    it('should return empty array if benefits for employees is undefined', function() {
      var product = new Product.model({});
      var benefitsForEmployees = product.getBenefitsForEmployeesAsArray();
      expect(benefitsForEmployees).to.eql([]);
    });

    it('should split benefits by delimiter', function() {
      var product = new Product.model({
        benefitsForEmployees: 'Finds the right answers, quickly and correctly#Better work/life balance#'
      });
      var benefitsForEmployees = product.getBenefitsForEmployeesAsArray();
      expect(benefitsForEmployees).to.have.lengthOf(2);
      expect(benefitsForEmployees[0]).to.eql('Finds the right answers, quickly and correctly');
    });

  });

  describe('.getBenefitsForEmployerAsArray', function() {

    it('should return empty array if benefits for employer is undefined', function() {
      var product = new Product.model({});
      var benefitsForEmployer = product.getBenefitsForEmployerAsArray();
      expect(benefitsForEmployer).to.eql([]);
    });

    it('should split benefits by delimiter', function() {
      var product = new Product.model({
        benefitsForEmployer: 'Supports consumer-driven health plans#Increases productivity, retention#Reduces claims costs, grievances, appeals#'
      });
      var benefitsForEmployer = product.getBenefitsForEmployerAsArray();
      expect(benefitsForEmployer).to.have.lengthOf(3);
      expect(benefitsForEmployer[0]).to.eql('Supports consumer-driven health plans');
    });

  });

});
