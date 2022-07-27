const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { createNewClassRequest, getAllUserClassesRequest, changeClassRequest } from '../controllers/class.controller';

router.use([jsonParser]);

router.get('/getClasses', [verifyJWT], getAllUserClassesRequest);
router.post('/createClass', [verifyJWT], createNewClassRequest);
router.post('/change', [verifyJWT], changeClassRequest);
