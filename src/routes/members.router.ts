const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { 
  getMembersRequest,
  addMembersRequest,
  changeMemberStatusRequest,
  getMembersLogsRequest,
  removeMembersRequest,
} from '../controllers/members.controller';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';

router.use([jsonParser]);

router.get('/get', [verifyJWT, isOfficer], getMembersRequest);
router.post('/add', [verifyJWT, isAdmin], addMembersRequest);
router.post('/status', [verifyJWT, isOfficer], changeMemberStatusRequest);
router.get('/logs', [verifyJWT, isAdmin], getMembersLogsRequest);
router.post('/remove', [verifyJWT, isAdmin], removeMembersRequest);
