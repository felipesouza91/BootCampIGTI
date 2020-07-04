import fs from 'fs';
import AccountShema from '../schema/account.js';

export default async function readDocument() {
  const accounts = readFile();
  for (const account of accounts) {
    const { agencia, conta } = account;
    const isExists = await AccountShema.exists({ agencia, conta });
    if (!isExists) {
      await AccountShema.create(account);
    }
  }
}

function readFile() {
  try {
    const data = fs.readFileSync('accounts.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

function writeFile(data) {
  try {
    fs.writeFileSync('account.json', JSON.stringify(data));
  } catch (erro) {
    throw error;
  }
}
