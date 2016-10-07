var _ = require('lodash');
var error = require('../utils/error.js');
var parser = require('../utils/parser-response.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* POST /login/ */
router.post('/', function(req, res, next) {
  var user = 
    Usuario.find( { email: req.body.email, senha: req.body.senha }, 'nome email' , function (err, post) {
      parser.error(res, 400, err);
      if(post.length > 0) {
        parser.success(res, 200, _.assign({}, { auth: true }, post[0]._doc ));
      } else {
        parser.error(res, 404, { auth: false });
      }
    })
    .limit(1)
    .select({ email: 1, occupation: 1 });
});

module.exports = router;