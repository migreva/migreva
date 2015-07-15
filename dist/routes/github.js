'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashCollectionMap = require('lodash/collection/map');

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _express = require('express');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../../config');

var GitHubApi = (function () {
  function GitHubApi(app) {
    _classCallCheck(this, GitHubApi);

    this.githubUser = 'migreva';
    this.gitHubRoot = 'https://api.github.com/';
    this.githubLoginUrl = 'https://github.com/login/oauth/authorize';

    this.gitRepos = {
      renvy: {
        owner: 'michigan-com',
        name: 'renvy'
      },
      dashbeat: {
        owner: 'michigan-com',
        name: 'dashbeat'
      },
      migreva: {
        owner: 'migreva',
        name: 'migreva'
      }
    };

    this.initRoutes(app);
  }

  _createClass(GitHubApi, [{
    key: 'initRoutes',
    value: function initRoutes(app) {
      var _this = this;

      this.router = (0, _express.Router)();

      this.router.get('/github/languages/', function callee$2$0(req, res) {
        var responses;
        return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return _regeneratorRuntime.awrap(this.getRepoLanguages());

            case 2:
              responses = context$3$0.sent;

              res.json({
                repos: responses
              });

            case 4:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this);
      });

      app.use(this.router);
    }
  }, {
    key: 'getRepoLanguages',

    /**
     * Iterates over this.gitRepos, hits the /languages and gets the languages
     *
     * @memberof GitHubApi
     *
     * @returns {Object} { username, repo, stats}
     */
    value: function getRepoLanguages() {
      var urls, repoName, repo, responses, returnVal;
      return _regeneratorRuntime.async(function getRepoLanguages$(context$2$0) {
        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            urls = [];

            for (repoName in this.gitRepos) {
              repo = this.gitRepos[repoName];

              urls.push(this.gitHubRoot + 'repos/' + repo.owner + '/' + repo.name + '/languages?access_token=' + _config.github.token);
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_Promise.all((function () {
              var _Promise$all = [];
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = _getIterator(urls), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var url = _step.value;

                  _Promise$all.push(_this2.fetch(url));
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return _Promise$all;
            })()));

          case 4:
            responses = context$2$0.sent;
            returnVal = (0, _lodashCollectionMap2['default'])(responses, function (resp) {
              console.log(resp.url);
              var match = /repos\/([^\/]+)\/([^\/]+)\/languages/.exec(resp.url);
              if (!match) return { stats: resp.body };else {
                return {
                  username: match[1],
                  repo: match[2],
                  stats: resp.body
                };
              }
            });

            console.log(returnVal);
            return context$2$0.abrupt('return', returnVal);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fetch',

    /**
     * Generates a promise and fetches the [url]
     *
     * @memeberof GitHubApi
     * @param {String} [url] Url to fetch
     * @return {Object} Promise. Resolves with the following object
     *  {
     *    url: url that was fetched,
     *    body: response body
     *  }
     */
    value: function fetch(url) {
      return new _Promise(function (resolve, reject) {

        var headers = {
          'User-Agent': 'migreva',
          'Accept': 'application/vnd.github.v3+json'
        };

        console.log('Fetching ' + url);
        _request2['default'].get({
          url: url,
          headers: headers
        }, function (err, resp, body) {
          if (err) reject(err);
          console.log('Returned from ' + url);
          resolve({
            url: url,
            body: JSON.parse(body)
          });
        });
      });
    }
  }]);

  return GitHubApi;
})();

exports['default'] = GitHubApi;
module.exports = exports['default'];