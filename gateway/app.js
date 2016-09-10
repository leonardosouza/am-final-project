var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('../certificates/server.key'),
    cert: fs.readFileSync('../certificates/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = require('express')();
var server = require('https').Server(options, app);
server.listen(8888, function() {
    console.log("server started at port 8888");  
});


var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('Client connected.', socket);
  console.log('-----');
  
  socket.on('command', function (data) {
    sendData(data);
  });
});

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
