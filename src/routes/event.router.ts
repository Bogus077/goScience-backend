const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';
import { addEventRequest, getEventAdressesRequest, getEventRequest, getEventsRequest, removeEventRequest, updateEventRequest } from '../controllers/event.controller';

router.use([jsonParser]);

router.get('/get', [verifyJWT, isOfficer], getEventsRequest);
router.get('/getOne', [verifyJWT, isOfficer], getEventRequest);
router.post('/add', [verifyJWT, isOfficer], addEventRequest);
router.post('/update', [verifyJWT, isOfficer], updateEventRequest);
router.delete('/remove', [verifyJWT, isOfficer], removeEventRequest);
router.get('/address', [verifyJWT, isOfficer], getEventAdressesRequest);
