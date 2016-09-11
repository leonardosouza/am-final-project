var mongoose = require('mongoose');

var ModeloSchema = new mongoose.Schema({
  descricao: String,
  motor: String,
  fabricanteId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Modelo', ModeloSchema);
