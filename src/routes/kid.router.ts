const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getAllKidsRequest, createNewKidRequest, updateKidRequest, removeKidRequest } from '../controllers/kid.controller';

router.use([jsonParser]);

router.get('/getKids', [verifyJWT], getAllKidsRequest);
router.post('/createKids', [verifyJWT], createNewKidRequest);
router.post('/update', [verifyJWT], updateKidRequest);
router.delete('/remove', [verifyJWT], removeKidRequest);



