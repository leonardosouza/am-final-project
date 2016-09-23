var localtunnel = require('localtunnel');
var Deferred = require("promised-io/promise").Deferred;
var PROXY_PORT = 8887;

/** Tunnelling */
var getTunnel = function() {
  var deferred = new Deferred();
  var tunnel = localtunnel(PROXY_PORT, function(err, tunnel) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(tunnel.url);
    }
  });

  tunnel.on('close', function() {
    console.log('CONNECTION LOST!');
  });

  return deferred.promise;
}

module.exports = getTunnel;
