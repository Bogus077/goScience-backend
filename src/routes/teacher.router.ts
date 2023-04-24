const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { addTeacherRequest, editTeacherRequest, getAllTeachersRequest, removeTeacherRequest } from '../controllers/teacher.controller';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';

router.use([jsonParser]);

router.get('/get', [verifyJWT, isOfficer], getAllTeachersRequest);
router.post('/add', [verifyJWT, isOfficer], addTeacherRequest);
router.delete('/delete', [verifyJWT, isOfficer], removeTeacherRequest);
router.post('/edit', [verifyJWT, isOfficer], editTeacherRequest);
