var chai = require('chai');
var sinon = require('sinon');
var PreferredBenefits = require('../../../../models/domain/PreferredBenefits');
var expect = chai.expect;

describe('PreferredBenefits', function() {

  describe('.rank', function() {

    it('should return benefits grouped & ordered by votes', function() {
      var preferredBenefits = [
        {"preferredBenefits": [{slug: "slug-1", "title": "title 1"}, {slug: "slug-3", "title": "title 3"}]},
        {"preferredBenefits": [{slug: "slug-2", "title": "title 2"}, {slug: "slug-3", "title": "title 3"}, {slug: "slug-4", "title": "title 4"}]},
        {"preferredBenefits": [{slug: "slug-3", "title": "title 3"}, {slug: "slug-2", "title": "title 2"}]},
      ];

      var ranking = new PreferredBenefits(preferredBenefits).rank();

      expect(ranking.length).to.be.eql(4);
      expect(ranking[0].slug).to.be.eql("slug-3");
      expect(ranking[0].votes).to.be.eql(3);

      expect(ranking[1].slug).to.be.eql("slug-2");
      expect(ranking[1].votes).to.be.eql(2);

      expect(ranking[2].votes).to.be.eql(1);
      
      expect(ranking[3].votes).to.be.eql(1);
    });

  });

});
