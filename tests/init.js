var keystone = require('keystone');
var chai = require('chai');

keystone.init({
  'name': 'vas-tests',
  's3 config': {} //leave this here or stuff will break (magic)
});

keystone.import('../models');

chai.should();
