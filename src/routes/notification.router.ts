const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';
import { createNotificationsRequest, getAllNotificationsRequest, readNotificationsRequest, removeNotificationsRequest } from '../controllers/notifications.controller';

router.use([jsonParser]);

router.get('/get', [verifyJWT, isOfficer], getAllNotificationsRequest);
router.post('/read', [verifyJWT, isOfficer], readNotificationsRequest);
router.post('/add', [verifyJWT, isAdmin], createNotificationsRequest);
router.delete('/remove', [verifyJWT, isAdmin], removeNotificationsRequest);
