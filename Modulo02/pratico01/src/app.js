var express = require('express');
var fs = require('fs');
var path = require('path');
const Estados = require('./files/Estados.json');

function readFile(uf) {
  var filePath = path.resolve(__dirname, 'files', 'cidadeestado', `${uf}.json`);
  var jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

function cidadesPorEstado(uf = 'RJ') {
  const estado = Estados.find((item) => item.Sigla === uf);
  const data = readFile(estado.Nome);
  return { data, total: data.length };
}

function estadosComMaisCidades() {
  let estados = [];
  Estados.forEach(function (estado) {
    const result = cidadesPorEstado(estado.Sigla);
    estados.push({ Sigal: estado.Sigla, total: result.total });
  });
  const maiores = estados.sort((a, b) => b.total - a.total).slice(0, 5);
  return maiores;
}

function estadosComMenosCidades() {
  let estados = [];
  Estados.forEach(function (estado) {
    const result = cidadesPorEstado(estado.Sigla);
    estados.push({ Sigal: estado.Sigla, total: result.total });
  });
  const maiores = estados.sort((a, b) => a.total - b.total).slice(0, 5);
  return maiores;
}

cidadesPorEstado();
console.log(estadosComMaisCidades());
console.log(estadosComMenosCidades());
