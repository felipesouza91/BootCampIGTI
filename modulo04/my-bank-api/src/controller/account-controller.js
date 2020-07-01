import mongoose from 'mongoose';
import AccountShema from '../schema/account.js';

const AccountController = {
  async index(req, res) {
    const result = await AccountShema.find();
    return res.json(result);
  },

  async save(req, res) {
    const { agencia, conta, name, balance } = req.body;
    try {
      const result = await new AccountShema({
        agencia,
        conta,
        name,
        balance,
      }).save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        error: `Erro ao processar requisição`,
        errorInfo: error.message,
      });
    }
  },

  async deposit(req, res) {
    const { agencia, conta, valor } = req.body;
    if (!agencia || !conta || !valor) {
      return res.status(400).json({
        error: 'Informe os campos obrigatorios: agencia, conta, valor',
      });
    }
    const account = await AccountShema.findOne({ agencia, conta });
    if (!account) {
      return res.status(400).json({
        error: 'A conta informada não foi encontrada',
      });
    }
    account.balance += valor;
    account.save();
    return res.json(account.balance);
  },

  async draft(req, res) {
    const { agencia, conta, valor } = req.body;
    if (!agencia || !conta || !valor) {
      return res.status(400).json({
        error: 'Informe os campos obrigatorios: agencia, conta, valor',
      });
    }
    const account = await AccountShema.findOne({ agencia, conta });
    if (!account) {
      return res.status(400).json({
        error: 'A conta informada não foi encontrada',
      });
    }
    if (account.balance - valor + 1 < 0) {
      return res.status(400).json({
        error:
          'A conta informada não possui saldo o suficiente para a retirada',
      });
    }
    account.balance -= valor;
    account.save();
    return res.json(account.balance);
  },

  async balance(req, res) {
    const { agencia, conta } = req.body;
    if (!agencia || !conta) {
      return res.status(400).json({
        error: 'Informe os campos obrigatorios: agencia, conta, valor',
      });
    }
    const account = await AccountShema.findOne({ agencia, conta });
    if (!account) {
      return res.status(400).json({
        error: 'A conta informada não foi encontrada',
      });
    }

    return res.json(account.balance);
  },

  async delete(req, res) {
    const { agencia, conta } = req.body;
    if (!agencia || !conta) {
      return res.status(400).json({
        error: 'Informe os campos obrigatorios: agencia, conta, valor',
      });
    }
    const account = await AccountShema.findOne({ agencia, conta });
    if (!account) {
      return res.status(400).json({
        error: 'A conta informada não foi encontrada',
      });
    }
    await AccountShema.findByIdAndDelete(account._id);
    const response = await AccountShema.countDocuments();

    return res.json({ totalContas: response });
  },
};

export default AccountController;
