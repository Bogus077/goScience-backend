const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { getAllTasksRequest, createNewDayTaskRequest, createNewWeekTaskRequest, createNewQuarterTaskRequest, createNewMonthTaskRequest, changeTaskStatusRequest, removeTaskRequest, addDayToTaskRequest } from '../controllers/tasks.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);

router.post('/getTasks', [verifyJWT], getAllTasksRequest);
router.post('/createDayTask', [verifyJWT], createNewDayTaskRequest);
router.post('/createWeekTask', [verifyJWT], createNewWeekTaskRequest);
router.post('/createMonthTask', [verifyJWT], createNewMonthTaskRequest);
router.post('/createQuarterTask', [verifyJWT], createNewQuarterTaskRequest);
router.post('/addDay', [verifyJWT], addDayToTaskRequest);
router.post('/status', [verifyJWT], changeTaskStatusRequest);
router.delete('/remove', [verifyJWT], removeTaskRequest);
