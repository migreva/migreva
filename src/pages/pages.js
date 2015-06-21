var _ = require('lodash');
var migreva = require('./migreva');
var subpages = require('./subpages');

var pages = [
  migreva,
  subpages
]

module.exports = function(app) {
  _.forEach(pages, function(page) {
    page(app);
  });

  return {

  }
}