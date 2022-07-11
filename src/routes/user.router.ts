const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

import { signUpRequest, getAllUsersRequest } from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.get('/getUsers', getAllUsersRequest);
// router.get('/getAvailableKids', [verifyJWT], getAvailableKids);
