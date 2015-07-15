'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _jade = require('jade');

var _jade2 = _interopRequireDefault(_jade);

var _libHelpers = require('../lib/helpers');

var _libHelpers2 = _interopRequireDefault(_libHelpers);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var router = _express2['default'].Router();

var subpages = [{
  name: 'Index',
  url: '/',
  templateName: 'migreva'
}, {
  name: 'Stuff',
  url: '/stuff',
  templateName: 'subpages/stuff'
}, {
  name: 'Contact',
  url: '/contact',
  templateName: 'subpages/contact'
}];

module.exports = function (app) {

  // For each subpage we have, route the URL by name and load the jade temaplte
  (0, _lodashCollectionForEach2['default'])(subpages, function (subpage) {

    router.get(subpage.url, function (req, res) {

      console.log(req.header('Content-Type'));
      if (req.is('application/json')) {
        console.log('is json');
        // Return json
        res.json({
          success: true,

          // Load the HTML of the jade tempalte
          page: _jade2['default'].renderFile(app.get('views') + '/' + subpage.templateName + '.jade')
        });
      } else {
        console.log('is not json');
        res.render(subpage.templateName, {
          title: subpage.name + ' - migreva.com',
          pageLoad: true
        });
      }
    });
  });

  app.use(router);
};