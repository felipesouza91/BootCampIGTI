import express from 'express';
import fs from 'fs';

var router = express.Router();

router.get('/', (req, res) => {
  try {
    const { accounts } = readFile();
    return res.json(accounts);
  } catch (error) {
    return res.status(500).json({ error: 'Erro on persist account' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { accounts } = readFile();
    const account = accounts.find((item) => item.id === Number(id));
    if (!account) {
      return res.status(404).json();
    }
    return res.json(account);
  } catch (error) {
    return res.status(500).json({ error: 'Erro on persist account' });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, balance } = req.body;
    const json = readFile();
    const id = json.nextId;
    json.accounts.push({ id, name, balance });
    json.nextId++;
    fs.writeFile('account.json', JSON.stringify(json), (error) => {
      if (error) {
        throw erro;
      } else {
        return res.status(201).json({ id, name, balance });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro on persist account' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, balance } = req.body;
    const { nextId, accounts } = readFile();
    const index = accounts.findIndex((account) => account.id === Number(id));
    if (index < 0) {
      return res.status(404).json();
    }
    accounts[index].name = name;
    accounts[index].balance = balance;
    writeFile({ nextId, accounts });
    return res.status(200).json(accounts[index]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro on persist account' });
  }
});

router.post('/transaction/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const { nextId, accounts } = readFile();
    const index = accounts.findIndex((account) => account.id === Number(id));
    if (index < 0) {
      return res.status(404).json();
    }
    accounts[index].balance += Number(value);
    writeFile({ nextId, accounts });
    return res.status(200).json(accounts[index]);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ error: 'Erro on deposit' });
  }
});

router.delete('/transaction/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const { nextId, accounts } = readFile();
    const index = accounts.findIndex((account) => account.id === Number(id));
    if (index < 0) {
      return res.status(404).json();
    }
    if (accounts[index].balance - Number(value) < 0) {
      return res
        .status(400)
        .json({ error: 'Your account has no balance, for this transaction!' });
    }
    accounts[index].balance -= Number(value);
    writeFile({ nextId, accounts });
    return res.status(200).json(accounts[index]);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ error: 'Erro on deposit' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    let json = readFile();
    const index = json.accounts.findIndex(
      (account) => account.id === Number(id)
    );
    if (index < 0) {
      return res.status(404).json();
    }
    json.accounts.splice(index, 1);
    writeFile(json);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: 'Erro on persist account' });
  }
});

function readFile() {
  try {
    const data = fs.readFileSync('account.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw erro;
  }
}

function writeFile(data) {
  try {
    fs.writeFileSync('account.json', JSON.stringify(data));
  } catch (erro) {
    throw erro;
  }
}

export default router;
