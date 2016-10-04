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
var vehicleId;
var tunnelName;
var parsedData;
var smsSender = require('./sms-sender');
var smsSended = false;
var findData = false;

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

var openSerial = function(serialData) {
  var processData = function(rawData) {
    deviceId = serialData.deviceId;
  };

  var processMonitor = function(rawData) {
    parsedData = parseRawData(rawData);
    if(Object.keys(parsedData).length) {
      console.log(JSON.stringify(parsedData));
    }

    if(parsedData && parsedData.deviceId) {
      discoverVehicleId(parsedData);
    }

    if(parsedData && parsedData.carBlocked && parsedData.triggeredAlarm && vehicleId) {
      logOcurrence(vehicleId, parsedData);
      sendSmsMessage(parsedData.deviceId, parsedData);
    }
  };

  var parseRawData = function(rawData) {
    try {
      var parsed = JSON.parse(rawData);
      if(parsed && parsed.latlong && parsed.latlong.length === 2) {
        return parsed;
      }
    } catch(e) {}
    return {};
  };

  serialData.port
    .on('error', genericError)
    .on('data', processMonitor)
    .on('data', getSerialData.bind(this, processData));

  serialPort = serialData.port;
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

var discoverVehicleId = function(dataFromDevice) {
  if(!vehicleId) {
    requestify
      .get(apiPath + '/dispositivo/' + dataFromDevice.deviceId)
      .then(function(response) {
        if(response && response.getBody().length > 0) {
          vehicleId = _.head(response.getBody()).veiculoId;
        }
      });

    setInterval(function() {
      if(vehicleId) {
        logOcurrence(vehicleId, parsedData);
      } 
    }, 5000);
  }
};

var logOcurrence = function(vehicleId, deviceData) {
  if(deviceData && deviceData.latlong && deviceData.latlong.length === 2) {
    requestify
      .post(apiPath + '/localizacao', {
        latitude: deviceData.latlong[0],
        longitude: deviceData.latlong[1],
        bloqueado: deviceData.carBlocked,
        alarmeDisparado: deviceData.triggeredAlarm,
        veiculoId: vehicleId
      })
      .then(function(response) {
        console.log(response.getBody());
      });
  }
};

var sendSmsMessage = function(device, deviceData) {
  if(!(smsSended && findData)) {
    findData = true;

    requestify
      .get(apiPath + '/dispositivo/all/' + device)
      .then(function(response) {
        var allData = response.getBody();
        var strMsg = 'Atenção Sr(a) %nome%! Detectamos que uma atividade suspeita está ocorrendo neste exato momento com o seu veículo de placas %placa%.';
        var strTel = allData.usuario.telefone;
        var strRpl = ['$1', allData.usuario.nome, '$3', allData.veiculo.placa].join('');
        strMsg = strMsg.replace(/(.+)(%nome%)(.+)(%placa%)/gmi, strRpl);
        smsSended = smsSender(strTel, strMsg);
        console.log('SMS SENT SUCCESSFULY!');
      });
  } else {
    console.log('SMS NOT SENT!');
  }
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
  smsSended = false;
  findData = false;
  sendSerialData('R');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'reset' });
});
