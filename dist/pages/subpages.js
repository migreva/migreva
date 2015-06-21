'use strict';

var _ = require('lodash');
var jade = require('jade');
var helpers = require('../lib/helpers');

var subpages = ['stuff', 'contact'];

module.exports = function (app) {

  // Helper functions
  function generateUrl(subpage) {
    return '/' + subpage;
  }
  function templateFilename(subpage) {
    return app.get('views') + '/subpages/' + subpage + '.jade';
  }

  // For each subpage we have, route the URL by name and load the jade temaplte
  _.forEach(subpages, function (subpage) {

    app.get(generateUrl(subpage), function (req, res) {

      if (helpers.isJsonReq(req)) {
        // Return json
        res.json({
          success: true,

          // Load the HTML of the jade tempalte
          page: jade.renderFile(templateFilename(subpage))
        });
      } else {
        res.render('subpages/' + subpage, {
          title: subpage + ' - migreva.com',
          pageLoad: true
        });
      }
    });
  });
};