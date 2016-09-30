var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Firebase = require('../models/Firebase.js');

/* GET /firebase */
router.get('/', function(req, res, next) {
  Firebase.find(function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* POST /firebase */
router.post('/', function(req, res, next) {
  Firebase.create(req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* GET /firebase/:emailUsuario */
router.get('/:emailUsuario?', function(req, res, next) {
  Firebase.find({ emailUsuario: req.params.emailUsuario }, function (err, post) {
    if (err) return res.json(err);
    if (post === null || post.length == 0) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json((post.length > 1) ? post : post[0]);
  });
});

/* PUT /firebase/:id */
router.put('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndUpdate({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* DELETE /firebase/:id */
router.delete('/:emailUsuario?', function(req, res, next) {
  Firebase.findOneAndRemove({ emailUsuario: req.params.emailUsuario }, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

module.exports = router;