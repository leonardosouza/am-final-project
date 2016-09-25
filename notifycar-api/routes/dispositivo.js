var Promise = require('bluebird');
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dispositivo = require('../models/Dispositivo.js');
var Veiculo = require('../models/Veiculo.js');
var Usuario = require('../models/Usuario.js');

Promise.promisifyAll(mongoose);

/* GET /dispositivo */
router.get('/all/:deviceId', function(req, res, next) {
  
  var allData = {};

  var getDevice = function() {
    return Promise.props({
      dispositivo: Dispositivo.find({ deviceId: req.params.deviceId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { dispositivo: r.dispositivo[0] });
      return r.dispositivo[0].veiculoId;
    });
  };

  var getVehicle = function(idVeiculo) {
    return Promise.props({
      veiculo: Veiculo.find({ _id: idVeiculo }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { veiculo: r.veiculo[0] });
      return r.veiculo[0].usuarioId;
    });
  };

  var getUser = function(idUsuario) {
    return Promise.props({
      usuario: Usuario.find({ _id: idUsuario }, 'nome email telefone deviceToken atualizadoEm').execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { usuario: r.usuario[0] });
      return allData;
    });
  };

  var jsonResp = function(v) {
    return res.json(v);
  }

  getDevice()
    .then(getVehicle)
    .then(getUser)
    .then(jsonResp)
    .catch(jsonResp);
});


/* GET /dispositivo */
router.get('/', function(req, res, next) {
  Dispositivo.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /dispositivo/:deviceId */
router.get('/:deviceId', function(req, res, next) {
  Dispositivo.find({ 'deviceId': req.params.deviceId }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /dispositivo */
router.post('/', function(req, res, next) {
  Dispositivo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /dispositivo/:id */
router.get('/:id', function(req, res, next) {
  Dispositivo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /dispositivo/:id */
router.put('/:id', function(req, res, next) {
  Dispositivo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /dispositivo/:id */
router.delete('/:id', function(req, res, next) {
  Dispositivo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;