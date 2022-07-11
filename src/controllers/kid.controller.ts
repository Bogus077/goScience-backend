import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Kid, Class } from '../models/index';
import { createNewKid } from '../utils/kid/kid';

export async function getAllKidsRequest(req: Request, res: Response) {
  try{
    const result = await Kid.findAll({include: {
      model: Class
    }});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewKidRequest(req: Request, res: Response) {
  try{
    const result = await createNewKid(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
