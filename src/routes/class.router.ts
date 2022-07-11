const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { createNewClassRequest, getAllClassesRequest, getAllUserClassRelRequest } from '../controllers/class.controller';

router.use([jsonParser]);

router.get('/getClasses', getAllClassesRequest);
router.post('/createClass', createNewClassRequest);
router.get('/getRel', getAllUserClassRelRequest);

