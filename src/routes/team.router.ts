const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { verifyJWT } from '../middlewares';
const jsonParser = bodyParser.json();

import { getAvailableKids, addKidToTeam, getTeam } from "../controllers/team.controller";

router.use([jsonParser]);

router.get('/getAvailableKids', [verifyJWT], getAvailableKids);
router.put('/addKidToTeam', [verifyJWT], addKidToTeam);
router.get('/getTeam', [verifyJWT], getTeam);