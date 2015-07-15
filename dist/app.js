'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _expressIo = require('express.io');

var _expressIo2 = _interopRequireDefault(_expressIo);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routesMigreva = require('./routes/migreva');

var _routesMigreva2 = _interopRequireDefault(_routesMigreva);

var app = (0, _expressIo2['default'])();

// Template language
app.set('views', _path2['default'].join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
app.use(_expressIo2['default']['static'](_path2['default'].join(__dirname, '../static')));
app.use(_expressIo2['default']['static'](_path2['default'].join(__dirname, '../node_modules')));

(0, _routesMigreva2['default'])(app);

if (!_config2['default'].PROD) {
  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
}