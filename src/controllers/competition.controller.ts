import { Request, Response } from 'express';
import { JwtPayload } from '../middlewares/authJwt';
import { addKidToUserTeam, filterAlreadyAddedKids } from '../utils/team';
import {sequelize} from '../database/database.config';
import { AvailableKidModel, CompetitionModel, TeamKidModel } from '../models/index';
import { createNewCompetition } from '../utils/competitions';
import { Competition } from '../utils/competitions/types';

export async function createCompetition(req: Request & {jwt: JwtPayload}, res: Response) {
  try{    
    // const newCompetition: Competition = {
    //   title: 'Тестовые соревнования',
    //   dateStart: new Date().toLocaleDateString(),
    //   type: 'Подтягивания',
    //   strength: 1,
    //   agility: 1,
    //   accuracy: 0,
    //   intellect: 0,
    //   speed: 0
    // }
    const competition = req.body;

    const newCompetition: Competition = {...competition, dateStart: new Date()};

    const result = await createNewCompetition(newCompetition);
    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getCompetitions(req: Request & {jwt: JwtPayload}, res: Response) {
  try{    
    const result = await CompetitionModel.findAll();
    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}