var Promise = require('bluebird');
var _ = require('lodash');
var requestify = require('requestify');
var apiPath = 'http://notifycar-api.mybluemix.net';
var deviceId = '0x14100000-0x2341-0x8036';
Promise.promisifyAll(requestify);

var getDeviceData = function() {
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

var sendPushNotification = function(allData) {
  var message = {
    to: allData.fcmId, 
    collapse_key: 'carro',
    notification: { title: allData.title, body: allData.message }
  };

  pushSended = pushSender(message); 
}



