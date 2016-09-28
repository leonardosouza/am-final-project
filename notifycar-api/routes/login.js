var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* POST /login/ */
router.post('/', function(req, res, next) {
  var user = 
    Usuario.find( { email: req.body.email, senha: req.body.senha }, 'nome email' , function (err, post) {
      if (err) return res.json(err);
      if(post.length > 0) {
        res.json(_.assign({}, { auth: true }, post[0]._doc ));
      } else {
        res.json({ auth: false });
      }
    })
    .limit(1)
    .select({ email: 1, occupation: 1 });
});

module.exports = router;