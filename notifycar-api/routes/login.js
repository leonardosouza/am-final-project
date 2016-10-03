var _ = require('lodash');
var error = require('../config/error.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* POST /login/ */
router.post('/', function(req, res, next) {
  var user = 
    Usuario.find( { email: req.body.email, senha: req.body.senha }, 'nome email' , function (err, post) {
      if (err) return res.status(400).json(err);
      if(post.length > 0) {
        res.status(202).json(_.assign({}, { auth: true }, post[0]._doc ));
      } else {
        res.status(404).json({ auth: false });
      }
    })
    .limit(1)
    .select({ email: 1, occupation: 1 });
});

module.exports = router;