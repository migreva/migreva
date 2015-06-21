module.exports = {
  isJsonReq: function(req) {
    return req.rawHeaders.indexOf('X-Requested-With') !== -1;
  }
}