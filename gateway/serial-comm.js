/** Serial Communication **/
var SerialPort = require('serialport');
var port;

SerialPort.list(function (err, ports) {
  var discoveredPort = [];
  
  ports.forEach(function(port) {
    discoveredPort = port.comName.match(/.+(cu.usbmodem).+/);
  });

  openConnection(discoveredPort[0]);
});

var openConnection = function(discoveredPort) {
  if(discoveredPort) {
    console.log('OPENING', discoveredPort);
    port = new SerialPort(discoveredPort, {
      baudRate: 57600,
      parser: SerialPort.parsers.readline('\n')
    });

    port
      .on('error', genericError)
      .on('data', getData);
  } else {
    console.log('FAILED');
  }
};

var closeConnection = function() {
  if(port) {
    console.log('CLOSING', discoveredPort[0]);
    port.close();
  }
};

var genericError = function(err) {
  if(err && err.message) {
    console.log(err.message);
  }
};

var sendData = function(command) {
  port.write(command, genericError);
};

var getData = function(data) {
  console.log(data);
};

module.exports = {
  sendData: sendData
};
