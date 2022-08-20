import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { TasksDay, TasksWeek, TasksQuarter } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { changeSummaryStatus, createKidUserSummary, getKidSummary } from '../utils/summary/summary';

export async function getCurrentTaskSummaryRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await getKidSummary(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addKidUserSummaryRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createKidUserSummary(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function changeSummaryStatusRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await changeSummaryStatus(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}