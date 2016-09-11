var mongoose = require('mongoose');

var FabricanteSchema = new mongoose.Schema({
  nome: String,
  pais: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fabricante', FabricanteSchema);
