import { Request, Response } from 'express'
import { sequelize } from '../database/database.config';
import { Teacher } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { addTeacher, editTeacher, removeTeacher } from '../utils/teacher/teacher';

export async function addTeacherRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await addTeacher(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}