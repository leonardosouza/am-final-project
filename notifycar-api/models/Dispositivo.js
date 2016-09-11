var mongoose = require('mongoose');

var DispositivoSchema = new mongoose.Schema({
  guid: String,
  veiculoId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dispositivo', DispositivoSchema);
