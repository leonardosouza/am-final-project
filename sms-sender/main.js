var twilio = require("./node_modules/twilio/lib");


var accountSid = 'AC1898c9f84b3e4ee1867143be6f8cfaa6'; // Your Account SID from www.twilio.com/console
var authToken = '708716ab6f7b697365ab9106b77de15e';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);


client.messages.create({
	body: "HEllo from node",
	to: "+5511975846899",
	from: "+12569527022"
}, function(err, message){
	console.log(err);
});

