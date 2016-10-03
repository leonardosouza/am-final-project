/** Serial Communication **/
var SerialPort = require('serialport');
var Deferred = require("promised-io/promise").Deferred;
var port;

var openConnection = function() {
  var deferred = new Deferred();

  SerialPort.list(function (err, ports) {
    var discoveredPort = [];
    
    ports.forEach(function(port) {
      console.log(port);
      discoveredPort = port.comName.match(/.+(cu.usbmodem).+/);
    });

    if(discoveredPort) {
      console.log('OPENING', discoveredPort[0]);
      port = new SerialPort(discoveredPort[0], {
        baudRate: 57600,
        parser: SerialPort.parsers.readline('\n')
      });
      deferred.resolve(port);
    } else {
      deferred.reject('FAILED OPENING SERIAL CONNECTION');
    }
  });

  return deferred.promise;
};

// var sendData = function(command) {
//   port.write(command, genericError);
// };

module.exports = openConnection;