'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _subpages = require('./subpages');

var _subpages2 = _interopRequireDefault(_subpages);

var _github = require('./github');

var _github2 = _interopRequireDefault(_github);

module.exports = function (app) {

  var subpages = (0, _subpages2['default'])(app);
  var github = new _github2['default'](app);

  return {};
};