const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getUserTeamsRequest, createTeamRequest, updateTeamRequest, removeTeamRequest, addKidToTeamRequest, removeKidFromTeamRequest } from '../controllers/project.controller';

router.use([jsonParser]);

router.get('/getTeams', [verifyJWT], getUserTeamsRequest);
router.post('/createTeam', [verifyJWT], createTeamRequest);
router.post('/updateTeam', [verifyJWT], updateTeamRequest);
router.delete('/team', [verifyJWT], removeTeamRequest);
router.post('/addKidToTeam', [verifyJWT], addKidToTeamRequest);
router.delete('/removeKidFromTeam', [verifyJWT], removeKidFromTeamRequest);
