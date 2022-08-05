const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { 
  getUserProjectsRequest, 
  createProjectRequest, 
  updateProjectRequest, 
  removeProjectRequest, 
  createProjectTaskRequest, 
  updateProjectTaskRequest,
  removeProjectTaskRequest,
  addKidToProjectTaskRequest,
} from '../controllers/project.controller';

router.use([jsonParser]);

router.get('/get', [verifyJWT], getUserProjectsRequest);
router.post('/create', [verifyJWT], createProjectRequest);
router.post('/update', [verifyJWT], updateProjectRequest);
router.delete('/remove', [verifyJWT], removeProjectRequest);
router.post('/createTask', [verifyJWT], createProjectTaskRequest);
router.post('/updateTask', [verifyJWT], updateProjectTaskRequest);
router.delete('/removeTask', [verifyJWT], removeProjectTaskRequest);
router.post('/addKid', [verifyJWT], addKidToProjectTaskRequest);
