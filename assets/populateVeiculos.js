var env = require('dotenv').config();
var _ = require('lodash');
var apiPath = process.env.API_PATH;
var requestify = require('requestify');
var fs         = require('fs');
var json = JSON.parse(fs.readFileSync('moreFiles/veiculos.txt','utf-8'));

var modelos = [];

requestify
  .get(apiPath + '/fabricante')
  .then(function (response) {
  
    json.forEach(function(veiculo) {
      modelos.push({ 
        nome: veiculo.modelo,  
        fabricanteId: _.find(response.getBody(), { nome: veiculo.marca })._id,
        motor: '1.0'
      });
    });

    return modelos;
  })
  .then(function(modelos) {
  
    var totalModelos = modelos.length-1;

    var processPopulate = setInterval(function() {
      if(totalModelos < 0) {
        clearInterval(processPopulate);
        console.log('DONE!');
        return;
      }

      requestify
        .request(apiPath + '/modelo', {
          method:'POST',
          body: modelos[totalModelos--],
          headers:{ 'Content-Type': 'application/json; charset=utf-8' },
          dataType:'json'
        }).then(function(resp){
          console.log('INSERT ===>', resp.getBody());
        });

    }, 500);
  });