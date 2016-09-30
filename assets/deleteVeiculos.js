var requestify = require('requestify');
var ids = [];

requestify.get('http://notifycar-api.mybluemix.net/modelo').then(function (resp) {
	
	for(var i = 0; i < resp.getBody().length; i++){
		ids[i] =resp.getBody()[i]._id;
	}

	console.log(ids);
	for(var x = 0; x < ids.length; x++){	
	requestify.delete('http://notifycar-api.mybluemix.net/modelo/' + ids[x]).then(function(response){
		});
	}	
})