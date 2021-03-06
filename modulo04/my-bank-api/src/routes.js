import express from 'express';
import AccountController from './controller/account-controller.js';

const routes = express.Router();

routes.get('/', AccountController.index);
routes.get('/balance', AccountController.balance);
routes.get('/mediun', AccountController.mediumAgencia);
routes.get('/less-balance', AccountController.lessBalance);
routes.get('/high-balance', AccountController.highBalance);
routes.get('/private', AccountController.privateAgencia);
routes.post('/', AccountController.save);

routes.put('/deposit', AccountController.deposit);
routes.put('/draft', AccountController.draft);
routes.put('/transference', AccountController.transfer);

routes.delete('/', AccountController.delete);

export default routes;
