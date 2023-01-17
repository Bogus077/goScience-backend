'use strict';

import express, { Application, Request, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as ClassRouter } from './routes/class.router';
import { router as KidRouter } from './routes/kid.router';
import { router as TasksRouter } from './routes/tasks.router';
import { router as StatsRouter } from './routes/stats.router';
import { router as TeamRouter } from './routes/team.router';
import { router as ProjectRouter } from './routes/project.router';
import { router as SummaryRouter } from './routes/summary.router';
import { router as MembersRouter } from './routes/members.router';
import { router as AuthRouter } from './routes/auth.router';
import { router as NotifiationsRouter } from './routes/notification.router';
import { serverConfig } from './config/config';
import cors from 'cors';
import { onConnection } from './utils/socket/connection';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
import { verifyJwtSocket, verifyOfficerRole } from './utils/socket/authHandler';
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// app.use(tokenValidation);
app.use(cors());
app.use('/user', UserRouter);
app.use('/class', ClassRouter);
app.use('/kid', KidRouter);
app.use('/tasks', TasksRouter);
app.use('/stats', StatsRouter);
app.use('/team', TeamRouter);
app.use('/project', ProjectRouter);
app.use('/summary', SummaryRouter);
app.use('/members', MembersRouter);
app.use('/auth', AuthRouter);
app.use('/notifications', NotifiationsRouter);
app.get('/', (request, response) => {
  response.send('Hello, Hackerman!');
});

// обрабатываем подключение веб-сокета
io.use((socket, next) => verifyJwtSocket(socket, next));
io.use((socket, next) => verifyOfficerRole(socket, next));
io.on('connection', (socket: Socket) => onConnection(io, socket))

server.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
