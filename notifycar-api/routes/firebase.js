var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Firebase = require('../models/Firebase.js');

/* GET /firebase */
router.get('/', function(req, res, next) {
  Firebase.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /firebase */
router.post('/', function(req, res, next) {
  Firebase.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /firebase/:emailUsuario */
router.get('/:emailUsuario?', function(req, res, next) {
  Firebase.find({ emailUsuario: req.params.emailUsuario }, function (err, post) {
    response.error(res, 400, err);
    
    res.status(200).json((post.length > 1) ? post : post[0]);
  });
});

/* PUT /firebase/:id */
router.put('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndUpdate({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /firebase/:id */
router.delete('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndRemove({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;