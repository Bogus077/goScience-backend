'use strict';

import express, { Application, Request, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as TeamRouter } from "./routes/team.router";
import { router as CompetitionRouter } from "./routes/competition.router";
const { serverConfig } = require('./config/config');
const cors = require('cors');
const app = express();

// app.use(tokenValidation);
app.use(cors());
app.use('/api/user', UserRouter);
app.use('/api/team', TeamRouter);
app.use('/api/competitions', CompetitionRouter);
app.get('/api/', (request, response) => {
  response.send('Hello world!');
});

app.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
