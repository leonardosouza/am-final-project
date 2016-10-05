var env = require('dotenv').config();
var twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var fromNumber = process.env.TWILIO_FROM_NUMBER;
var client = new twilio.RestClient(accountSid, authToken);

var sendMessage = function(number, message){
    client.messages.create({
      to: number,
      body: message,
      from: fromNumber
    }, function(err, message) {
      console.log(err);
      return false;
    });
    
    return true;
};

module.exports = sendMessage;