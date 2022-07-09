import { Request, Response } from 'express';
import { JwtPayload } from '../middlewares/authJwt';
import { addKidToUserTeam, filterAlreadyAddedKids } from '../utils/team';
import {sequelize} from '../database/database.config';
import { AvailableKidModel, TeamKidModel } from '../models/index';

export async function getAvailableKids(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const {id: teamId} = req.jwt;    
    const availableKids = await AvailableKidModel.findAll();
    const result = await filterAlreadyAddedKids(teamId, availableKids);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addKidToTeam(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const {id: teamId} = req.jwt;
    const kidId = req.body.id;

    await addKidToUserTeam(kidId, teamId);
    const result = await TeamKidModel.findAll({where:{team_id: teamId}});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getTeam(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const {id: teamId} = req.jwt;

    const result = await TeamKidModel.findAll({where:{team_id: teamId}});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}