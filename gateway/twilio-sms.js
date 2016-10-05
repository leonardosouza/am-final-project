var env = require('dotenv').config();
var twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var fromNumber = process.env.TWILIO_FROM_NUMBER;
var client = new twilio.RestClient(accountSid, authToken);

var twilioSendSms = function(message){
  client.messages.create({
    to: message.to,
    body: message.notification.body,
    from: fromNumber
  }, function(err, message) {
    console.log(err);
    return false;
  });
  
  return true;
};

module.exports = twilioSendSms;