const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getAiHelpRequest } from '../controllers/helper.controller';

router.use([jsonParser]);

router.get('/help', [verifyJWT], getAiHelpRequest);