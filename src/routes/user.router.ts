const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';

import { 
  signUpRequest, 
  getAllUsersRequest, 
  getUserRequest, 
  signInRequest, 
  checkIsPhoneAlreadyExistRequest, 
  createRoleRequest,
  addRoleToUserRequest,
  removeRoleFromUserRequest,
} from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.post('/signIn', signInRequest);
router.get('/getUsers', [verifyJWT, isAdmin], getAllUsersRequest);
router.get('/getUser', [verifyJWT], getUserRequest);
router.post('/checkPhone', checkIsPhoneAlreadyExistRequest);
router.post('/createRole', [verifyJWT, isAdmin], createRoleRequest);
router.post('/addRoleToUser', [verifyJWT, isAdmin], addRoleToUserRequest);
router.post('/removeRoleFromUser', [verifyJWT, isAdmin], removeRoleFromUserRequest);
