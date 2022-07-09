import { Request, Response } from 'express';
import {sequelize} from '../../database/database.config';
import { AvailableKidModel, TeamKidModel } from "../../models";
import { validateData, addKidToTeamRules } from '../validationRules';

export const addKidToUserTeam = async (kidId: number, teamId: number) => {
  validateData({kidId: kidId}, addKidToTeamRules);
  const kid = await AvailableKidModel.findOne({where: {id: +kidId}});
  
  if(!kid){
    throw { errorMessage: 'Кадет не найден' };
  }

  const addedKid = {
    team_id: teamId,
    kid_id: kid.id,
    name: kid.name,
    lastName: kid.lastName,
    position: kid.position,
    level: kid.level,
    strength: kid.strength,
    agility: kid.agility,
    accuracy: kid.accuracy,
    intellect: kid.intellect,
    speed: kid.speed,
  }
  
  const result = await TeamKidModel.create(addedKid);
  return result;
}

export const filterAlreadyAddedKids = async (teamId: number, availableKids: any) => {
  const teamKids = await TeamKidModel.findAll({where:{team_id: teamId}});
  const teamKidIds = teamKids.map((kid: {kid_id: number}) => kid.kid_id);

  return availableKids.filter((kid: {id: number}) => !teamKidIds.includes(kid.id))
}