var requestify = require('requestify');

var ids = [];
requestify.get('http://notifycar-api.mybluemix.net/fabricante').then(function(response){
	
	for(var i =0; i < response.getBody().length; i++){
		ids[i] = response.getBody()[i]._id;
	}
	
	for(var x = 0; x < ids.length; x++){	
	requestify.delete('http://notifycar-api.mybluemix.net/fabricante/' + ids[x]).then(function(response){
		
	});
}
	
});