import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import './mongo-connection.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/account', routes);

app.listen(3333, () => {
  console.log('Server is running');
});
