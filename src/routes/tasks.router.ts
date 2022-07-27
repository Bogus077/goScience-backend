const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { getAllTasksRequest, createNewTaskGroupRequest, createNewDayTaskRequest, createNewWeekTaskRequest, createNewQuarterTaskRequest } from '../controllers/tasks.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);

router.post('/getTasks', [verifyJWT], getAllTasksRequest);
router.post('/createTaskgroup', [verifyJWT], createNewTaskGroupRequest);
router.post('/createDayTask', [verifyJWT], createNewDayTaskRequest);
router.post('/createWeekTask', [verifyJWT], createNewWeekTaskRequest);
router.post('/createQuarterTask', [verifyJWT], createNewQuarterTaskRequest);


