import express from 'express';
import AccountController from './controller/account-controller.js';

const routes = express.Router();

routes.get('/', AccountController.index);
routes.get('/balance', AccountController.balance);

routes.post('/', AccountController.save);

routes.put('/deposit', AccountController.deposit);
routes.put('/draft', AccountController.draft);

routes.delete('/', AccountController.delete);

export default routes;
