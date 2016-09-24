var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* POST /login/:email/:pass */
router.post('/:email/:pass', function(req, res, next) {
  Usuario.find( { email: req.params.email, senha: req.params.pass } , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;