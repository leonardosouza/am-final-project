var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Localizacao = require('../models/Localizacao.js');

/* GET /localizacao */
router.get('/', function(req, res, next) {
  Localizacao.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /localizacao */
router.post('/', function(req, res, next) {
  Localizacao.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /localizacao/:id */
router.get('/:id', function(req, res, next) {
  Localizacao.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /localizacao/veiculo/:id */
router.get('/veiculo/:id/:limit?/:order?', function(req, res, next) {
  Localizacao
    .find({ 'veiculoId': req.params.id } , function (err, post) {
      response.error(res, 400, err);
      
      if(post.length > 1) {
        response.success(res, 200, post, error.notFound);
      } else {
        res.json(post[0]);
      }
    })
    .limit(req.params.limit || 100)
    .sort(req.params.order === 'ASC' ? {} : { _id: -1 });
});

/* PUT /localizacao/:id */
router.put('/:id?', function(req, res, next) {
  Localizacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /localizacao/:id */
router.delete('/:id?', function(req, res, next) {
  Localizacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;