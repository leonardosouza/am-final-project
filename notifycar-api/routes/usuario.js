var Promise = require('bluebird');
var _ = require('lodash');
var error = require('../config/error.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dispositivo = require('../models/Dispositivo.js');
var Veiculo = require('../models/Veiculo.js');
var Usuario = require('../models/Usuario.js');
var Modelo = require('../models/Modelo.js');
var Fabricante = require('../models/Fabricante.js');

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
    return Promise.props({
      veiculo: Veiculo.find({ usuarioId: idUsuario }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { veiculo: r.veiculo[0] });
      return { veiculoId: r.veiculo[0]._id, modeloId: r.veiculo[0].modeloId };
    });
  };


  var getModel = function(obj) {
    return Promise.props({
      modelo: Modelo.find({ _id: obj.modeloId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { modelo: r.modelo[0] });
      return _.assign(obj, { fabricanteId: r.modelo[0].fabricanteId });
    });
  };

  var getVendor = function(obj) {
    return Promise.props({
      fabricante: Fabricante.find({ _id: obj.fabricanteId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { fabricante: r.fabricante[0] });
      return obj;
    });
  };

  var getDevice = function(obj) {
    return Promise.props({
      dispositivo: Dispositivo.find({ veiculoId: obj.veiculoId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { dispositivo: r.dispositivo[0] });
      return allData;
    });
  };

  var jsonSuccess = function(v) {
    return res.json(v);
  }

  var jsonError = function(v) {
    return res.status(404).json(error.notFound);
  }

  getUser()
    .then(getVehicle)
    .then(getModel)
    .then(getVendor)
    .then(getDevice)
    .then(jsonSuccess)
    .catch(jsonError);
});


/* GET /usuario */
router.get('/', function(req, res, next) {
  Usuario.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) return res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* POST /usuario */
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) return res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* GET /usuario/:id */
router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) return res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* PUT /usuario/:id */
router.put('/:id?', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) return res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /usuario/:id */
router.delete('/:id?', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) return res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;