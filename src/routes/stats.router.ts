const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

import { getUserStats } from "../controllers/stats.controller";

router.use([jsonParser]);

router.get('/get', [verifyJWT], getUserStats);

