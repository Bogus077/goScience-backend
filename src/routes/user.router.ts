const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import { signUpRequest, logInRequest, checkIsPhoneAlreadyExistRequest } from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.post('/checkPhone', checkIsPhoneAlreadyExistRequest);
router.post('/logIn', logInRequest);
