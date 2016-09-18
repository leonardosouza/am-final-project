var env = require('dotenv').config();
var requestify = require('requestify');
var lodash = require('lodash');
var webserver = require('./webservers');
var serial = require('./serial-comm');
var tunnel = require('./tunnelling');
var app = webserver.app;
var server = webserver.server;
var apiPath = process.env.API_PATH;
var serialPort;
var deviceId;
var tunnelName;

console.log(process.env.API);

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
  var processData = function(rawData) {
    deviceId = parseRawData().deviceId;
  };

  var processMonitor = function(rawData) {
    console.log(rawData)
    var parsedData = parseRawData(rawData);
    if(parsedData && parsedData.carBlocked && parsedData.triggeredAlarm) {
      console.log('ALARME DISPARADO! LOG LOG LOG');
    }
  };

  var parseRawData = function(rawData) {
    try {
      return JSON.parse(rawData);
    } catch(e) {}
    return {};
  };

  port
    .on('error', genericError)
    .on('data', processMonitor)
    .on('data', getSerialData.bind(this, processData));

  serialPort = port;
};


var openTunnel = function(url) {
  tunnelName = url;
  serial().then(openSerial, genericError.bind(this, new Error('FAIL ON OPEN SERIAL PORT')));

  var timeout = setInterval(function() {
    if(deviceId !== null) {
    
      requestify.post(apiPath + '/gateway/register', {
        deviceId: deviceId,
        remoteControl: url
      })
      .then(function(response) {
        console.log(response.getBody());
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
  res.json({ deviceId: deviceId, carBlocked: true, carStatus: 'locked' });
});

app.get('/unlock', function(req, res) {
  sendSerialData('U');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'unlocked' });
});

app.get('/reset', function(req, res) {
  sendSerialData('R');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'reset' }); 
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