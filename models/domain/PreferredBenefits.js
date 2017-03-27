var _ = require('lodash');

var PreferredBenefits = function(employeePreferredBenefitsJson) {

  this.employeePreferredBenefits = employeePreferredBenefitsJson;

  this.rank = function() {
    var benefitsRanking = {};

    _.forEach(this.employeePreferredBenefits, function(preferredBenefits) {
      _.forEach(preferredBenefits.preferredBenefits, function(preferredBenefit) {
        if (benefitsRanking[preferredBenefit.slug]) {
          benefitsRanking[preferredBenefit.slug].votes++;
        } else {
          benefitsRanking[preferredBenefit.slug] = {
            slug: preferredBenefit.slug,
            title: preferredBenefit.title,
            votes: 1
          };
        }
      });
    });

    benefitsRanking = _.sortBy(benefitsRanking, ['votes']).reverse();
    return benefitsRanking;
  }

}

module.exports = PreferredBenefits;
