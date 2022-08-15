import { Request, Response } from 'express'
import { Kid, Project, ProjectTask, Team } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { addKidToTeam, createTeam, removeKidFromTeam, removeTeam, updateTeam } from '../utils/teams/teams';

export async function getUserTeamsRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await Team.findAll({
      where: {UserId: req.jwt.id, isDeleted: null},
      attributes: { exclude: ['isDeleted'] },
      include: [
        Kid,
        {
          model: Project,
          where: { isDeleted: null },
          required: false,
          include: [
            {
              model: ProjectTask,
              where: { isDeleted: null },
              required: false,
            }
          ]
        }
      ],
      order: [
        [Project, 'id', 'desc']
      ]
    });

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createTeamRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createTeam(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function updateTeamRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await updateTeam(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeTeamRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeTeam(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addKidToTeamRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await addKidToTeam(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeKidFromTeamRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeKidFromTeam(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
