var _ = require('lodash');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* POST /login/ */
router.post('/', function(req, res, next) {
  var user = 
    Usuario.find( { email: req.body.email, senha: req.body.senha }, 'nome email' , function (err, post) {
      response.error(res, 400, err);
      if(post.length > 0) {
        response.success(res, 200, _.assign({}, { auth: true }, post[0]._doc ));
      } else {
        response.error(res, 404, { auth: false });
      }
    })
    .limit(1)
    .select({ email: 1, occupation: 1 });
});

module.exports = router;