import { Request, Response } from 'express';
import { sequelize } from '../../database/database.config';
import { CompetitionModel } from '../../models';
import { Competition } from './types';

export const createNewCompetition = async({title, dateStart, type, strength = 0, agility = 0, accuracy = 0, intellect = 0, speed = 0, winner = []}: Competition) => {
  const newCompetition = {
    title,
    dateStart,
    type,
    strength,
    agility,
    accuracy,
    intellect,
    speed,
    winner,
  };

  const result = await CompetitionModel.create(newCompetition);
  return result;
}