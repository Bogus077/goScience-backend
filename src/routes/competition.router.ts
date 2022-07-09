const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { verifyJWT } from '../middlewares';
const jsonParser = bodyParser.json();

import { getCompetitions, createCompetition } from "../controllers/competition.controller";

router.use([jsonParser]);

router.get('/getCompetitions', [verifyJWT], getCompetitions);
//TODO: add adminCheck
router.put('/createCompetition', [verifyJWT], createCompetition);