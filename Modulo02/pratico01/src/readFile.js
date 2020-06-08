var fs = require('fs');
var path = require('path');

function readFile(uf) {
  var filePath = path.resolve(__dirname, 'files', 'cidadeestado', `${uf}.json`);
  const dataread;
  fs.readFile('TEST.txt', function (err, data) {
    if (err) {
      console.error('Could not open file: %s', err);
      process.exit(1);
    }

    dataread= data;
  });
  return data
}

module-exports readFile;

