var env = require('dotenv').config();
var path = require('path');
var express = require('express');
var requestify = require('requestify');
var _ = require('lodash');
var webserver = require('./webservers');
var serial = require('./serial-comm');
var tunnel = require('./tunnelling');
var app = webserver.app;
var server = webserver.server;
var apiPath = process.env.API_PATH;
var serialPort;
var deviceId;
var tunnelName;
var smsSended = false;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules'));

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
    deviceId = parseRawData(rawData).deviceId;
  };

  var processMonitor = function(rawData) {
    console.log(rawData);
    var parsedData = parseRawData(rawData);
    if(parsedData && parsedData.carBlocked && parsedData.triggeredAlarm) {
      discoverAndLog(parsedData.deviceId, parsedData);
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
    console.log('LOCALTUNNEL ==>', url);
    if(deviceId) {
      requestify.post(apiPath + '/gateway/register', {
        deviceId: deviceId,
        remoteControl: url
      })
      .then(function(response) {
        console.log('BLUEMIX API ==>', response.getBody());
      });

      clearInterval(timeout);
    } else {
      console.log('GETTING DEVICE ID...');
    }
  }, 1000);
};

var discoverAndLog = function(device, deviceData) {
  requestify
    .get(apiPath + '/dispositivo/' + device)
    .then(function(response) {
      logCurrentLocation(_.head(response.getBody()), deviceData);
    });
};

var logCurrentLocation = function(vehicleData, deviceData) {
  requestify
    .post(apiPath + '/localizacao', {
      latitude: deviceData.latlong[0],
      longitude: deviceData.latlong[1],
      bloqueado: deviceData.carBlocked,
      alarmeDisparado: deviceData.triggeredAlarm,
      veiculoId: vehicleData.veiculoId
    })
    .then(function(response) {
      console.log(response.getBody());
    });
};

tunnel().then(openTunnel, genericError.bind(this, new Error('FAIL ON OPEN TUNNEL')));


/** Proxy Routes **/
app.get('/', function(req, res) {
  res.render('index', { deviceId: deviceId, teste: 'Leonardo' });
});

app.post('/lock', function(req, res) {
  sendSerialData('L');
  res.json({ deviceId: deviceId, carBlocked: true, carStatus: 'locked' });
});

app.post('/unlock', function(req, res) {
  sendSerialData('U');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'unlocked' });
});

app.post('/reset', function(req, res) {
  sendSerialData('R');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'reset' });
});
