var Promise = require('bluebird');
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dispositivo = require('../models/Dispositivo.js');
var Veiculo = require('../models/Veiculo.js');
var Usuario = require('../models/Usuario.js');

Promise.promisifyAll(mongoose);

/* GET /all/:emailUsuario */
router.get('/all/:emailUsuario', function(req, res, next) {
  
  var allData = {};

  var getUser = function() {
    return Promise.props({
      usuario: Usuario.find({ email: req.params.emailUsuario }, 'nome email telefone deviceToken atualizadoEm').execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { usuario: r.usuario[0] });
      return r.usuario[0]._id;
    });
  };

  var getVehicle = function(idUsuario) {
    console.log('===>', idUsuario);
    return Promise.props({
      veiculo: Veiculo.find({ usuarioId: idUsuario }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { veiculo: r.veiculo[0] });
      return r.veiculo[0]._id;
    });
  };

  var getDevice = function(idVeiculo) {
    return Promise.props({
      dispositivo: Dispositivo.find({ veiculoId: idVeiculo }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { dispositivo: r.dispositivo[0] });
      return allData;
    });
  };

  var jsonResp = function(v) {
    return res.json(v);
  }

  getUser()
    .then(getVehicle)
    .then(getDevice)
    .then(jsonResp)
    .catch(jsonResp);
});


/* GET /usuario */
router.get('/', function(req, res, next) {
  Usuario.find(function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* POST /usuario */
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* GET /usuario/:id */
router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* PUT /usuario/:id */
router.put('/:id?', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* DELETE /usuario/:id */
router.delete('/:id?', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

module.exports = router;