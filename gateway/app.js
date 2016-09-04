var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var command = '';

server.listen(8080);

io.on('connection', function (socket) {
  socket.on('command', function (data) {
    sendData(data);
  });
});

var SerialPort = require("serialport");

var port = new SerialPort("/dev/cu.usbmodem1411", {
  baudRate: 57600,
  parser: SerialPort.parsers.readline('\n')
});

var genericError = function(err) {
  if(err && err.message) {
    console.log('Error: ', err.message);
  }
};

var sendData = function(command) {
  port.write(command, genericError);
};

var getData = function(data) {
  console.log(data);
};

port
  // .on('open', sendData)
  .on('error', genericError)
  .on('data', getData);

// console.log('==>', process.argv.slice(2));