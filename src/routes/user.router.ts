const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

import { signUpRequest, getAllUsersRequest, getUserRequest, signInRequest, checkIsPhoneAlreadyExistRequest } from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.post('/signIn', signInRequest);
router.get('/getUsers', [verifyJWT], getAllUsersRequest);
router.get('/getUser', [verifyJWT], getUserRequest);
router.post('/checkPhone', checkIsPhoneAlreadyExistRequest);

// router.get('/getAvailableKids', [verifyJWT], getAvailableKids);
