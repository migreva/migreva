'use strict';

module.exports = {
  isJsonReq: function isJsonReq(req) {
    return req.rawHeaders.indexOf('X-Requested-With') !== -1;
  }
};