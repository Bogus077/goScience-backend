import { Request, Response } from 'express';
import { JwtPayload } from 'src/middlewares/authJwt';
import { KidTeam, Team } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, createTeamRules, updateTeamRules, removeTeamRules, addKidToTeamRules, removeKidFromTeamRules } from '../validationRules';

/**
 * Проверка наличия прав на команду у текущего пользователя. В случае успеха возвращает команду.
 * @param TeamId 
 * @param UserId 
 * @returns 
 */
export const isTeamBelongsToUser = async (TeamId: number, UserId: number) => {
  if(!TeamId) throw { errorMessage: `Отсутствует идентификатор команды` };

  const team = await Team.findOne({where: {id: TeamId}});
  if(!team) throw { errorMessage: `Команда  с идентификатором ${TeamId} не найдена` };
  if(team.UserId !== UserId) throw { errorMessage: 'Выбранная команда не принадлежит данному пользователю' };
  return team;
}

export const createTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, createTeamRules);

  //Создание команды
  const newTeam = {
    label: req.label,
    UserId
  }
  const createdTeam = await Team.create(newTeam);

  //Добавление детей в команду
  const { kids } = req;
  if (kids) {
    for (const KidId of kids) {
      await isKidBelongsToUser(UserId, KidId);
    }

    for (const KidId of kids) {
      const newRow = {
        TeamId: createdTeam.id, 
        KidId
      };

      await KidTeam.create(newRow);     
    }
  }

  return { createdTeam };
}

export const updateTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, updateTeamRules);

  const team = await isTeamBelongsToUser(req.id, UserId);
  const { kids } = req;
  await KidTeam.destroy({where: {TeamId: team.id}});

  if (kids) {
    for (const KidId of kids) {
      await isKidBelongsToUser(UserId, KidId);
    }

    for (const KidId of kids) {
      const newRow = {
        TeamId: req.id, 
        KidId
      };

      await KidTeam.create(newRow);     
    }
  }

  return await team.update({label: req.label});
}

export const removeTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, removeTeamRules);

  const team = await isTeamBelongsToUser(req.id, UserId);
  return await team.update({isDeleted: true});
}

export const addKidToTeam = async (req: Request['body'], UserId: number) => {
  validateData(req, addKidToTeamRules);
  if(!req.KidId || req.KidId.length === 0) throw { errorMessage: 'Не выбран ученик, которого необходимо добавить в команду' };
  const result: string[] = [];
  const errors: string[] = [];

  const team = await isTeamBelongsToUser(req.TeamId, UserId);

  for (const KidId of req.KidId) {
    await isKidBelongsToUser(UserId, KidId);
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

  const team = await isTeamBelongsToUser(req.TeamId, UserId);

  for (const KidId of req.KidId) {
    await isKidBelongsToUser(UserId, KidId);
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