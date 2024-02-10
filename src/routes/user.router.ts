const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isAdminOrHead } from '../middlewares';

import { 
  signUpRequest, 
  getAllUsersRequest, 
  getUserRequest, 
  signInRequest, 
  checkIsPhoneAlreadyExistRequest, 
  createRoleRequest,
  addRoleToUserRequest,
  removeRoleFromUserRequest,
  changePasswordRequest,
  removeUserRequest,
  updateUserRequest,
} from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.post('/signIn', signInRequest);
router.delete('/delete', [verifyJWT, isAdmin], removeUserRequest);
router.get('/getUsers', [verifyJWT, isAdminOrHead], getAllUsersRequest);
router.get('/getUser', [verifyJWT], getUserRequest);
router.post('/checkPhone', checkIsPhoneAlreadyExistRequest);
router.post('/createRole', [verifyJWT, isAdmin], createRoleRequest);
router.post('/addRoleToUser', [verifyJWT, isAdminOrHead], addRoleToUserRequest);
router.post('/removeRoleFromUser', [verifyJWT, isAdminOrHead], removeRoleFromUserRequest);
router.post('/cd ', [verifyJWT, isAdminOrHead], changePasswordRequest);
router.post('/update', [verifyJWT, isAdminOrHead], updateUserRequest);
