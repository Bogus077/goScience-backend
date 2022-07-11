import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Class, User, UserClass } from '../models/index';
import { createToken } from '../utils/token';
import { createNewClass } from '../utils/class';

export async function getAllClassesRequest(req: Request, res: Response) {
  try{
    const result = await Class.findAll({include: {
      model: User,
      attributes: { exclude: ['password'] },
    }});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewClassRequest(req: Request, res: Response) {
  try{
    const result = await createNewClass(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getAllUserClassRelRequest(req: Request, res: Response) {
  try{

    const result = await UserClass.findAll();

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}