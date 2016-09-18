var requestify = require('requestify');
var lodash = require('lodash');
var webserver = require('./webservers');
var serial = require('./serial-comm');
var tunnel = require('./tunnelling');
var app = webserver.app;
var server = webserver.server;
var serialPort;
var deviceId;
var tunnelName;

var genericError = function(err) {
  if(err && err.message) {
    console.log(err.message);
  }
};

var sendSerialData = function(command) {
  serialPort.write(command, genericError);
};

var getSerialData = function(callback, data) {
  if(callback && typeof callback === 'function') {
    callback(data);
  }
};

var openSerial = function(port) {
  var processData = function(data) {
    deviceId = JSON.parse(data).deviceId;
  };

  port
    .on('error', genericError)
    .on('data', console.log)
    .on('data', getSerialData.bind(this, processData));

  serialPort = port;
};


var openTunnel = function(url) {
  tunnelName = url;
  serial().then(openSerial, genericError.bind(this, new Error('FAIL ON OPEN SERIAL PORT')));

  var timeout = setInterval(function() {
    console.log('timeout?', deviceId);
    if(deviceId !== null) {
      
      requestify.post('http://localhost:4000/gateway/register', {
        deviceId: deviceId,
        remoteControl: url
      })
      .then(function(response) {
        // Get the response body
        response.getBody();
      });

      clearInterval(timeout);
    }
  }, 1000);
};

tunnel()
  .then(openTunnel, genericError.bind(this, new Error('FAIL ON OPEN TUNNEL')));


/** Proxy Routes **/
app.get('/lock', function(req, res) {
  sendSerialData('L');
  res.send('Locked');
});

app.get('/unlock', function(req, res) {
  sendSerialData('U');
  res.send('Unlocked');
});

app.get('/reset', function(req, res) {
  sendSerialData('R');
  res.send('Reset');
});


// /** Websocket Listenning **/
// var io = require('socket.io')(server);
// io.on('connection', function (socket) {
//   console.log('Client connected.');
//   socket.emit('tunnel', { name: tunnelName });

//   socket.on('whichTunnel', function() {
//     socket.emit('tunnel', { name: tunnelName });
//   });

//   socket.on('command', function (data) {
//     sendSerialData(data);
//   });
// });