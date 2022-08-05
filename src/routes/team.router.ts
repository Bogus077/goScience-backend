const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getUserTeamsRequest, createTeamRequest, updateTeamRequest, removeTeamRequest, addKidToTeamRequest, removeKidFromTeamRequest } from '../controllers/team.controller';

router.use([jsonParser]);

router.get('/get', [verifyJWT], getUserTeamsRequest);
router.post('/create', [verifyJWT], createTeamRequest);
router.post('/update', [verifyJWT], updateTeamRequest);
router.delete('/remove', [verifyJWT], removeTeamRequest);
router.post('/addKid', [verifyJWT], addKidToTeamRequest);
router.delete('/removeKid', [verifyJWT], removeKidFromTeamRequest);
