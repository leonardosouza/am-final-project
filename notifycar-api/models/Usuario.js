var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  dataNascimento: Date,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
