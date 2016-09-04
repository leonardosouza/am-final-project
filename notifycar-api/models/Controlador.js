var mongoose = require('mongoose');

var ControladorSchema = new mongoose.Schema({
  imei: String,
  usuarioId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Controlador', ControladorSchema);
