var requestify = require('requestify');
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('moreFiles/marcasjson.txt','utf-8'));


for(var i = 0; i < json.length; i++){
	var marcaVeiculo = json[i].marca;
	var paisVeiculo  = json[i].pais;
	

	console.log(marcaVeiculo);

	requestify.request('http://notifycar-api.mybluemix.net/fabricante',{
		method: 'POST',
		body:{
			nome:marcaVeiculo,
			pais:paisVeiculo
		},
		headers:{
			'Content-Type': 'application/json; charset=utf-8'
		},
		dataType:'json'
		
	}).then(function(response){
		response.getBody();
	});
}
