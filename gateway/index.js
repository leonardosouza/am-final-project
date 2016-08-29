var SerialPort = require("serialport");

var port = new SerialPort("/dev/cu.usbmodem1411", {
  baudRate: 57600,
  parser: SerialPort.parsers.readline('\n')
});

var openingPort = function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });
};

var errorOpeningPort = function(err) {
  console.log('Error: ', err.message);
};

var processData = function(data) {
  console.log(data);
};

port
  .on('open', openingPort)
  .on('error', errorOpeningPort)
  .on('data', processData);