const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { 
  getCurrentTaskSummaryRequest, 
  addKidUserSummaryRequest, 
  changeSummaryStatusRequest 
} from '../controllers/summary.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);

router.get('/get', [verifyJWT], getCurrentTaskSummaryRequest);
router.post('/create', [verifyJWT], addKidUserSummaryRequest);
router.post('/status', [verifyJWT], changeSummaryStatusRequest);
