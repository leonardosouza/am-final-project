var twilio = require("./node_modules/twilio/lib");
var clients = require("./clients.json");

var accountSid = 'AC1898c9f84b3e4ee1867143be6f8cfaa6'; // Your Account SID from www.twilio.com/console
var authToken = '708716ab6f7b697365ab9106b77de15e';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

clients.forEach(function(obj){
    if(sendMessage(obj.phoneNumber, "Atenção! Seu carro está em movimento!")){
        console.log("Message send success to customer ",obj.name);
    }
});

function sendMessage(number, message){
     client.messages.create({
        body: message,
        to: number,
        from: "+12569527022"
    }, function(err, message){
        console.log(err);
        return false;
    });
    
    return true;
};