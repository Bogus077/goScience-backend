import { Request, Response } from 'express';
import { JwtPayload } from 'src/middlewares/authJwt';
import { KidTeam, Team } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, createTeamRules, updateTeamRules, removeTeamRules, addKidToTeamRules, removeKidFromTeamRules } from '../validationRules';

export const isTeamBelongsToUser = async (team: typeof Team, UserId: number) => {
  if(team.UserId !== UserId) throw { errorMessage: 'Выбранная команда не принадлежит данному пользователю' };
}

export const createTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, createTeamRules);

  const newTeam = {
    label: req.label,
    UserId
  }

  const createdTeam = await Team.create(newTeam);
  return createdTeam;
}

export const updateTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, updateTeamRules);

  const team = await Team.findOne({where: {id: req.id}});
  if(!team) throw { errorMessage: `Команда с идентификатором ${req.id} не найдена`};
  isTeamBelongsToUser(team, UserId);

  return await team.update({label: req.label});
}

export const removeTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, removeTeamRules);

  const team = await Team.findOne({where: {id: req.id}});
  if(!team) throw { errorMessage: `Команда с идентификатором ${req.id} не найдена`};
  isTeamBelongsToUser(team, UserId);

  return await team.update({isDeleted: true});
}

export const addKidToTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, addKidToTeamRules);
  if(!req.KidId || req.KidId.length === 0) throw { errorMessage: 'Не выбран ученик, которого необходимо добавить в команду' };
  const result: string[] = [];
  const errors: string[] = [];


  const team = await Team.findOne({where: {id: req.TeamId}})
  if(!team) throw { errorMessage: `Команда с идентификатором ${req.id} не найдена`};
  isTeamBelongsToUser(team, UserId);

  for (const KidId of req.KidId) {
    isKidBelongsToUser(UserId, KidId);
  }

  for (const KidId of req.KidId) {
    const newRow = {
      TeamId: req.TeamId, KidId
    };

    const alreadyExists = await KidTeam.findOne({where: newRow})
    if(alreadyExists) {
      errors.push(`Ученик с идентификатором ${KidId} уже добавлен в команду ${team.label}`)
    }else{
      const newKidTeam = await KidTeam.create(newRow);
      if(newKidTeam) result.push(newKidTeam);
    }    
  }
  return {result, errors};
}

export const removeKidFromTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, removeKidFromTeamRules);
  if(!req.KidId || req.KidId.length === 0) throw { errorMessage: 'Не выбран ученик, которого необходимо исключить из команды' };
  const result: string[] = [];
  const errors: string[] = [];


  const team = await Team.findOne({where: {id: req.TeamId}})
  if(!team) throw { errorMessage: `Команда с идентификатором ${req.id} не найдена`};
  isTeamBelongsToUser(team, UserId);

  for (const KidId of req.KidId) {
    isKidBelongsToUser(UserId, KidId);
  }

  for (const KidId of req.KidId) {
    const removingRow = {
      TeamId: req.TeamId, KidId
    };

    const kidTeamToRemove = await KidTeam.findOne({where: removingRow})
    if(!kidTeamToRemove) {
      errors.push(`Ученика с идентификатором ${KidId} нет в команде ${team.label}`)
    }else{
      kidTeamToRemove.destroy();
      result.push(`Ученик ${KidId} исключён из команды ${team.label}`)
    }    
  }
  return {result, errors};
}