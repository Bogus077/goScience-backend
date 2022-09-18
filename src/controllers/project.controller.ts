import { Request, Response } from 'express'
import { Kid, KidProjectTask, KidTeam, Project, ProjectTask, Team } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { addKidToProjectTask, archiveProject, createProject, createProjectTask, doneProjectTask, getProjectTaskById, removeProject, removeProjectTask, updateProject, updateProjectTask } from '../utils/project/project';

export async function getUserProjectsRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await Project.findAll({
      where: {UserId: req.jwt.id, isDeleted: null},
      attributes: { exclude: ['isDeleted'] },
      include: [{
        model: ProjectTask,
        where: { isDeleted: null },
        include: [Kid],
        required: false,
      }]
    });

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createProjectRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createProject(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function updateProjectRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await updateProject(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeProjectRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeProject(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function archiveProjectRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await archiveProject(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

//ProjectTasks 

export async function getProjectTaskByIdRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await getProjectTaskById(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createProjectTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await createProjectTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function updateProjectTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await updateProjectTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeProjectTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeProjectTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function doneProjectTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await doneProjectTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addKidToProjectTaskRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await addKidToProjectTask(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}