var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dispositivo = require('./routes/dispositivo');
var fabricante = require('./routes/fabricante');
var localizacao = require('./routes/localizacao');
var modelo = require('./routes/modelo');
var usuario = require('./routes/usuario');
var veiculo = require('./routes/veiculo');
var gateway = require('./routes/gateway');
var mongoDbConnStr = require('./config/mongodb');
var mongoose = require('mongoose');

// starting mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbConnStr)
  .then(() =>  console.log('connection with mongoDb is successful'))
  .catch((err) => console.error(err));

// start app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/dispositivo', dispositivo);
app.use('/fabricante', fabricante);
app.use('/localizacao', localizacao);
app.use('/modelo', modelo);
app.use('/usuario', usuario);
app.use('/veiculo', veiculo);
app.use('/gateway', gateway);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
