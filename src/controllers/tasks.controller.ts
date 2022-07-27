import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Taskgroup, TasksDay, TasksWeek, TasksQuarter } from '../models/index';
import { getKidTasks, createTaskGroup, createTask } from '../utils/tasks/tasks';

export async function getAllTasksRequest(req: Request, res: Response) {
  try{
    const result = await getKidTasks(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewTaskGroupRequest(req: Request, res: Response) {
  try{
    const result = await createTaskGroup(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewDayTaskRequest(req: Request, res: Response) {
  try{
    const result = await createTask(req.body, 'day');

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewWeekTaskRequest(req: Request, res: Response) {
  try{
    const result = await createTask(req.body, 'week');

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewQuarterTaskRequest(req: Request, res: Response) {
  try{
    const result = await createTask(req.body, 'quarter');

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
