import express from 'express';
import cors from 'cors';
import readAccounts from './controller/load-file.js';
import routes from './routes.js';
import './mongo-connection.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/account', routes);

app.listen(3333, async () => {
  await readAccounts();
  console.log('Server is running');
});
