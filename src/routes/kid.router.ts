const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getAllKidsRequest, createNewKidRequest } from '../controllers/kid.controller';

router.use([jsonParser]);

router.get('/getKids', getAllKidsRequest);
router.post('/createKid', createNewKidRequest);


