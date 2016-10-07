var express = require('express');
var error = require('../utils/error.js');
var parser = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Firebase = require('../models/Firebase.js');

/* GET /firebase */
router.get('/', function(req, res, next) {
  Firebase.find(function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* POST /firebase */
router.post('/', function(req, res, next) {
  Firebase.create(req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* GET /firebase/:emailUsuario */
router.get('/:emailUsuario?', function(req, res, next) {
  Firebase.find({ emailUsuario: req.params.emailUsuario }, function (err, post) {
    parser.error(res, 400, err);
    if (post === null || post.length == 0) res.status(404).json(error.notFound);
    res.json((post.length > 1) ? post : post[0]);
  });
});

/* PUT /firebase/:id */
router.put('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndUpdate({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* DELETE /firebase/:id */
router.delete('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndRemove({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

module.exports = router;