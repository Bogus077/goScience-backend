import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { TasksDay, TasksWeek, TasksQuarter } from '../models/index';
import { getKidTasks, createTask, changeTaskStatus, removeTask, addDayToTask } from '../utils/tasks/tasks';
import { JwtPayload } from '../middlewares/authJwt';
import { getCurrentClass } from '../utils/class';

export async function getAllTasksRequest(req: Request, res: Response) {
  try{
    const result = await getKidTasks(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewDayTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createTask(req.body, 'day', req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewWeekTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createTask(req.body, 'week', req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewMonthTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createTask(req.body, 'month', req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewQuarterTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createTask(req.body, 'quarter', req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addDayToTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await addDayToTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function changeTaskStatusRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await changeTaskStatus(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
