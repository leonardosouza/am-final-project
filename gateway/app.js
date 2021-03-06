var Promise = require('bluebird');
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
var smsSender = require('./twilio-sms');
var pushSender = require('./fcm-push');
var smsSended = false;
var pushSended = false;
var findDataSms = false;
var findDataPush = false;

Promise.promisifyAll(requestify);

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
      sendSMS(parsedData.deviceId);
      sendPUSH(parsedData.deviceId);
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
  }, 5000);
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

    var controlInterval = setInterval(function() {
      if(vehicleId) {
        logOcurrence(vehicleId, parsedData);
      } 
    }, 10000);
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

var getDeviceData = function(deviceId) {
  return Promise.props({
    all: requestify.get(apiPath + '/dispositivo/all/' + deviceId).then(function(res) { return res.getBody(); })
  })
  .then(function(r) {
    return r.all;
  });
};

var prepareMessage = function(allData) {
  var strEmail = allData.usuario.email;
  var strTitle = 'Alerta de Atividade Suspeita!';
  var strMsg = 'Atenção Sr(a) %nome%! Detectamos que uma atividade suspeita está ocorrendo neste exato momento com o seu veículo de placas %placa%.';
  var regExp = /(.+)(%nome%)(.+)(%placa%)/gmi;
  var strRpl = ['$1', allData.usuario.nome, '$3', allData.veiculo.placa].join('');
  strMsg = strMsg.replace(regExp, strRpl);

  return Promise.props({
    title: strTitle,
    message: strMsg,
    usuario: {
      email: allData.usuario.email,
      telefone: allData.usuario.telefone
    }
  })
  .then(function(r) {
    return r;
  });
};

var getFCM = function(allData) {
  return Promise.props({
    firebase: requestify.get(apiPath + '/firebase/' + allData.usuario.email).then(function(res) { return res.getBody(); })
  })
  .then(function(r) {
    return _.assign(allData, { fcmId: r.firebase.fcmId });
  });
};

var dispatchPush = function(allData) {
  var message = {
    to: allData.fcmId, 
    collapse_key: 'carro',
    notification: { title: allData.title, body: allData.message }
  };

  pushSended = pushSender(message); 
};

var sendPUSH = function(deviceId) {
  // console.log('DEBUG PUSH ===>', pushSended, findDataPush);
  if(!(pushSended && findDataPush)) {
    findDataPush = true;

    getDeviceData(deviceId)
      .then(prepareMessage)
      .then(getFCM)
      .then(dispatchPush);
    console.log('PUSH NOTIFICATION SUCCESSFULY!');
  } else {
    console.log('PUSH NOTIFICATION NOT SENT!');
  }
};

var dispatchSms = function(allData) {
  var message = {
    to: allData.usuario.telefone, 
    notification: { title: allData.title, body: allData.message }
  };

  smsSended = smsSender(message);
};

var sendSMS = function(deviceId) {
  // console.log('DEBUG SMS ===>', smsSended, findDataSms);
  if(!(smsSended && findDataSms)) {
    findDataSms = true;

    getDeviceData(deviceId)
      .then(prepareMessage)
      .then(dispatchSms);

    console.log('SMS SENT SUCCESSFULY!');
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
  findDataSms = false;
  pushSended = false;
  findDataPush = false;
  sendSerialData('R');
  res.json({ deviceId: deviceId, carBlocked: false, carStatus: 'reset' });
});
