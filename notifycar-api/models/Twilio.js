var mongoose = require('mongoose');

var TwilioSchema = new mongoose.Schema({
  twilioId: String,
  mensagem: String,
  de: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Twilio', TwilioSchema);
