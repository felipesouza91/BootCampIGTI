var fs = require('fs');
var path = require('path');
const Estados = require('./files/Estados.json');
const Cidades = require('./files/Cidades.json');
let ArrayCidade = [];
Estados.forEach(function (estado) {
  Cidades.forEach(function (cidade) {
    if (cidade.Estado === estado.ID) {
      ArrayCidade.push(cidade);
    }
  });
  fs.writeFile(estado.Nome + '.json', JSON.stringify(ArrayCidade), function (
    erro
  ) {
    if (erro) {
      throw erro;
    }

    console.log('Arquivo salvo');
  });
  ArrayCidade = [];
});
