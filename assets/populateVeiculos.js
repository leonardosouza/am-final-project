var env = require('dotenv').config();
var apiPath = process.env.API_PATH;
var requestify = require('requestify');
var fs         = require('fs');
var json = JSON.parse(fs.readFileSync('moreFiles/veiculos.txt','utf-8'));

var fabricantes = null;

requestify.get(apiPath + '/fabricante').then(function (response) {
  for(var i = 0; i < json.length; i++){
    for(var x = 0; x < response.getBody().length; x++){
      if(json[i].marca == response.getBody()[x].nome){
        
        console.log('===>', i, json[i].modelo);

        requestify.request(apiPath + '/modelo',{
          method:'POST',
          body:{
            nome:json[i].modelo,
            motor: '1.0',
            fabricanteId: response.getBody()[x]._id
          },
          headers:{
            'Content-Type': 'application/json; charset=utf-8'
          },
          dataType:'json'
        }).then(function(resp){
          console.log('===>', resp.getBody());
        });
      }
    }
  }
});