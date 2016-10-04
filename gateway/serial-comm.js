/** Serial Communication **/
var SerialPort = require('serialport');
var Deferred = require("promised-io/promise").Deferred;
var port;

var openConnection = function() {
  var deferred = new Deferred();

  SerialPort.list(function (err, ports) {
    var discoveredPort = [],
        discoveredDevice;
    
    ports.forEach(function(port) {
      discoveredPort = port.comName.match(/.+(cu.usbmodem).+/);
      discoveredDevice = [ port.locationId, port.vendorId, port.productId ].join('');
    });

    if(discoveredPort) {
      console.log('OPENING', discoveredPort[0]);
      port = new SerialPort(discoveredPort[0], {
        baudRate: 57600,
        parser: SerialPort.parsers.readline('\n')
      });
      deferred.resolve({ port: port, deviceId: discoveredDevice });
    } else {
      deferred.reject('FAILED OPENING SERIAL CONNECTION');
    }
  });

  return deferred.promise;
};

module.exports = openConnection;