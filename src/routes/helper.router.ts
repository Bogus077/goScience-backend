const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import {
  getAiHelpMarksRequest,
  getAiHelpTasksRequest,
} from '../controllers/helper.controller';

router.use([jsonParser]);

router.get('/tasks', [verifyJWT], getAiHelpTasksRequest);
router.get('/marks', [verifyJWT], getAiHelpMarksRequest);
