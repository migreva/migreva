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

      console.log(req.header('Content-Type'));
      if (req.is('application/json')) {
        console.log('is json');
        // Return json
        res.json({
          success: true,

          // Load the HTML of the jade tempalte
          page: jade.renderFile(templateFilename(subpage))
        });
      } else {
        console.log('is not json');
        res.render('subpages/' + subpage, {
          title: subpage + ' - migreva.com',
          pageLoad: true
        });
      }
    });
  });
};