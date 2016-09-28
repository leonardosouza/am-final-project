var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: [ true, 'Informe um nome de usuário!' ] },
  email: {
    type: String, 
    required: [ true, 'Informe um email válido!' ], 
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: '{VALUE} não é um email válido!'
    },
    unique: true 
  },
  senha: { type: String, required: [ true, 'Informe uma senha!' ]  },
  telefone: String,
  deviceToken: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
