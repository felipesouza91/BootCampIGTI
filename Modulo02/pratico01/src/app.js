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

function cidadeDeMaiorNomePorEstado() {
  let cidades = [];
  Estados.forEach(function (estado) {
    const { data } = cidadesPorEstado(estado.Sigla);
    const cidadeOrder = data
      .sort((a, b) => b.Nome.length - a.Nome.length)
      .sort((a, b) => b.Nome - a.Nome);

    cidades.push({ ...cidadeOrder[0], sigla: estado.Sigla });
  });

  return cidades.sort((a, b) => b.Nome.length - a.Nome.length);
}

function cidadeDeMenoNomePorEstado() {
  let cidades = [];
  Estados.forEach(function (estado) {
    const { data } = cidadesPorEstado(estado.Sigla);
    const cidadeOrder = data
      .sort((a, b) => a.Nome.length - b.Nome.length)
      .sort((a, b) => a.Nome.length - b.Nome.length);
    cidades.push({ ...cidadeOrder[0], sigla: estado.Sigla });
  });
  return cidades
    .sort((a, b) => {
      if (a.Nome < b.Nome) return -1;
      if (a.Nome > b.Nome) return 1;
      return 0;
    })
    .sort((a, b) => a.Nome.length - b.Nome.length);
}

cidadesPorEstado();
console.log(estadosComMaisCidades());
console.log(estadosComMenosCidades());
console.log(cidadeDeMaiorNomePorEstado());
console.log(cidadeDeMenoNomePorEstado());
console.log(cidadeDeMaiorNomePorEstado()[0]);
console.log(cidadeDeMenoNomePorEstado()[0]);
