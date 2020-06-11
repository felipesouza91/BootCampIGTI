import express from 'express';
import fs from 'fs';
import routes from './accounts.js';
import winston from 'winston';
import swaggerui from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import cors from 'cors';
var app = express();

const { combine, timestamp, label, printf } = winston.format;
var myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - {${label}} - ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'my-bank-api.log',
    }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

app.use('/account', routes);

app.listen(3333, () => {
  try {
    fs.readFile('account.json', 'utf8', (error, data) => {
      if (error) {
        const initialJons = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile('account.json', JSON.stringify(initialJons), (error) => {
          error ? console.log(error) : '';
        });
        console.log(error);
        return;
      }
    });
    console.log('Server running');
  } catch (error) {}
  logger.info('Server is running');
});
