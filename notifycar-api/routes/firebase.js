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

/* GET /firebase/:deviceId */
router.get('/:deviceId?', function(req, res, next) {
  Firebase.find({ deviceId: req.params.deviceId }, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json((post.length > 1) ? post : post[0]);
  });
});

/* PUT /firebase/:id */
router.put('/:id?', function(req, res, next) {
  Firebase.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* DELETE /firebase/:id */
router.delete('/:id?', function(req, res, next) {
  Firebase.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

module.exports = router;