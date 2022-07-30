import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Kid, Class } from '../models/index';
import { createNewKid, isKidBelongsToUser, removeKid, updateKid } from '../utils/kid/kid';
import { JwtPayload } from 'src/middlewares/authJwt';

export async function getAllKidsRequest(req: Request, res: Response) {
  try{
    const result = await Kid.findAll({include: [{
      model: Class
    }]});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createNewKidRequest(req: Request, res: Response) {
  try{
    const addedKids: any = [];

    for(let kid of req.body){
      const result = await createNewKid(kid);
      addedKids.push(result);
    }   

    res.status(200).send(addedKids);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function updateKidRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    await isKidBelongsToUser(req.jwt.id, req.body.id);
    const result = await updateKid(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeKidRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    await isKidBelongsToUser(req.jwt.id, req.body.id);
    const result = await removeKid(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
