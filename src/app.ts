'use strict';

import express, { Application, Request, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as ClassRouter } from './routes/class.router';
import { router as KidRouter } from './routes/kid.router';
import { router as TasksRouter } from './routes/tasks.router';
const { serverConfig } = require('./config/config');
const cors = require('cors');
const app = express();

// app.use(tokenValidation);
app.use(cors());
app.use('/api/user', UserRouter);
app.use('/api/class', ClassRouter);
app.use('/api/kid', KidRouter);
app.use('/api/tasks', TasksRouter);
app.get('/api/', (request, response) => {
  response.send('Hello, Hackerman!');
});

app.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
