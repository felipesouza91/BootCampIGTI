import express from 'express';
import fs from 'fs';
import winston from 'winston';
import router from './routes.js';
import cors from 'cors';
const { combine, timestamp, label, printf } = winston.format;
var myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - {${label}} - ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'grades-control-api.log',
    }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

var app = express();
app.use(cors());
app.use(express.json());
app.use('/grades', router);

app.listen(3333, () => {
  console.log('Server is running');
});
