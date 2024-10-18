import { Request, Response } from 'express';
import OpenAI from 'openai';
import { OPENAI_API_KEY_Proxy, openAiKey } from '../config/config';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
let multer = require('multer');
let upload = multer();
import fs from 'fs';
import { JwtPayload } from '../middlewares/authJwt';
import { Marks } from '../models';

const openai = new OpenAI({
  organization: 'org-fFeCsfdDRZwqxSrCeOrsdpZw',
  project: 'proj_I3XIjQQG7ezXYSVfOf2lQR2z',
  apiKey: openAiKey,
  // apiKey: OPENAI_API_KEY_Proxy,
  // baseURL: "https://api.proxyapi.ru/openai/v1/",
  httpAgent: HttpsProxyAgent(
    'http://yxhPUBNsXZgd98Rb:GfcM2Kn5WatDerSH@proxy1.accessai.ru:1080'
  ),
});

// export async function marksUploadRequest(req: Request, res: Response) {
//   try{

//   let sampleFile: UploadedFile;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   sampleFile = req.files.marks as UploadedFile;
//   // Построение пути к директории uploads
//   const uploadDir = path.join(process.cwd(), '/uploads');
//   const uploadPath = path.join(uploadDir, sampleFile.name);
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(uploadPath, function(err) {
//     if (err)
//     {
//       return res.status(500).send(err);
//     }

//     res.status(200).send({uploadPath});
//   });

//   }catch(error){
//     res.status(500).send(error);
//   }
// }

// export async function marksUploadTxtRequest(req: Request & {jwt: JwtPayload}, res: Response) {
//   try{
//     const UserId = req.jwt.id;
//     const fileData = JSON.stringify(req.body);
//     const uploadDir = path.join(process.cwd(), '/uploads');
//     const uploadPath = path.join(uploadDir, `marks-${UserId}.txt`);

//     fs.appendFile(uploadPath, fileData, async function() {

//       res.status(200).send(uploadPath);
//   });

//   }catch(error){
//     res.status(500).send(error);
//   }
// }

// export async function getMarksRequest(req: Request & {jwt: JwtPayload}, res: Response) {
//   try{
//     const UserId = req.jwt.id;

//     fs.readFile(`/var/www/granite/uploads/marks-${UserId}.txt`, 'utf8', (err, data) => {
//       res.status(200).send(JSON.parse(data));
//     });

//   }catch(error){
//     res.status(500).send(error);
//   }
// }

export async function marksUploadTxtRequest(
  req: Request & { jwt: JwtPayload },
  res: Response
) {
  try {
    const UserId = req.jwt.id;
    const fileData = JSON.stringify({ marks: req.body });

    await Marks.create({ UserId, marks: fileData, isDeleted: false });

    res.status(200).send(fileData);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getMarksRequest(
  req: Request & { jwt: JwtPayload },
  res: Response
) {
  try {
    const UserId = req.jwt.id;

    const marks = await Marks.findAll({
      where: { UserId: UserId, isDeleted: false },
      limit: 5,
      order: [['createdAt', 'DESC']],
    });

    if (marks) {
      res.status(200).send({
        marksList: marks.map((marksItem) => JSON.parse(marksItem.marks)),
        dateList: marks.map((marksItem) => marksItem.createdAt),
      });
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
