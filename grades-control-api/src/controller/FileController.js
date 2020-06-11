import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const filePath = path.resolve(__dirname, 'grades.json');

function readFile() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    throw error;
  }
}

function writeFile(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    throw error;
  }
}

export { readFile, writeFile };
