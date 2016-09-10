var localtunnel = require('localtunnel');
var PROXY_PORT = 8887;

/** Tunnelling */
var tunnel = localtunnel(PROXY_PORT, function(err, tunnel) {
    if (err) {
      console.log('tunnel :(');
    } else {
      console.log(tunnel.url);
    }
});

tunnel.on('close', function() {
  // tunnels are closed
  console.log('tunnel closed');
});

module.exports = tunnel;