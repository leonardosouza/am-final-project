var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
