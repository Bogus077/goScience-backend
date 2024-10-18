const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { getMarksRequest, marksUploadTxtRequest } from '../controllers/marks.controller';
import fileUpload from 'express-fileupload';
import { Request, Response } from 'express'

router.use([jsonParser]);
// router.use(express.urlencoded({ extended: true }));
// router.use(fileUpload());

// router.post('/upload', [verifyJWT], marksUploadRequest)
router.post('/uploadTxt', [verifyJWT], marksUploadTxtRequest)
router.get('/download', [verifyJWT], getMarksRequest)