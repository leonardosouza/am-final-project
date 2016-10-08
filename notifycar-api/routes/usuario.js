var Promise = require('bluebird');
var _ = require('lodash');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
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
    })
    .catch(function(r) {
      return r;
    });
  };

  var getVehicle = function(idUsuario) {
    return Promise.props({
      veiculo: Veiculo.find({ usuarioId: idUsuario }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { veiculo: r.veiculo[0] });
      return { veiculoId: r.veiculo[0]._id, modeloId: r.veiculo[0].modeloId };
    })
    .catch(function(r) {
      return r;
    });
  };


  var getModel = function(obj) {
    return Promise.props({
      modelo: Modelo.find({ _id: obj.modeloId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { modelo: r.modelo[0] });
      return _.assign(obj, { fabricanteId: r.modelo[0].fabricanteId });
    })
    .catch(function(r) {
      return r;
    });
  };

  var getVendor = function(obj) {
    return Promise.props({
      fabricante: Fabricante.find({ _id: obj.fabricanteId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { fabricante: r.fabricante[0] });
      return obj;
    })
    .catch(function(r) {
      return r;
    });
  };

  var getDevice = function(obj) {
    return Promise.props({
      dispositivo: Dispositivo.find({ veiculoId: obj.veiculoId }).execAsync()
    })
    .then(function(r) {
      allData = _.assign(allData, { dispositivo: r.dispositivo[0] });
      return allData;
    })
    .catch(function(r) {
      return r;
    });
  };

  var jsonSuccess = function(post) {
    return response.success(res, 200, post, error.notFound);
  };

  var jsonError = function(err) {
    return response.error(res, 400, err);
  };

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
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /usuario */
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /usuario/:id */
router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* PUT /usuario/:id */
router.put('/:id?', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /usuario/:id */
router.delete('/:id?', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;