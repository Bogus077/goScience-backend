import { Request, Response } from 'express';
import { KidProjectTask, KidTeam, Project, ProjectTask, Team } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { isTeamBelongsToUser } from '../teams/teams';
import { validateData, createProjectRules, updateProjectRules, removeProjectRules, createProjectTaskRules, updateProjectTaskRules, removeProjectTaskRules, addKidToProjectTaskRules } from '../validationRules';

/**
 * Проверка наличия прав на проект у текущего пользователя. В случае успеха возвращает проект.
 * @param ProjectId 
 * @param UserId 
 * @returns 
 */
export const isProjectBelongsToUser = async (ProjectId: number, UserId: number) => {
  if(!ProjectId) throw { errorMessage: `Отсутствует идентификатор проекта` };

  const project = await Project.findOne({where: {id: ProjectId}});
  if(!project) throw { errorMessage: `Проект с идентификатором ${ProjectId} не найден` };
  if(project.UserId !== UserId) throw { errorMessage: 'Выбранный проект не принадлежит данному пользователю' };
  return project;
}

export const createProject = async (req: Request['body'], UserId: number) => {
  validateData(req, createProjectRules);
  const {TeamId, label} = req;  
  if ( TeamId ) await isTeamBelongsToUser(TeamId, UserId);

  const newProject = {
    label,
    UserId,
    TeamId,
  }

  const createdProject = await Project.create(newProject);
  return createdProject;
}

export const updateProject = async (req: Request['body'], UserId: number) => {
  validateData(req, updateProjectRules);
  const {TeamId, ProjectId, label} = req;
  if ( TeamId ) await isTeamBelongsToUser(TeamId, UserId);
  const project = await isProjectBelongsToUser(ProjectId, UserId);

  const newProject = {
    label,
    TeamId,
  }

  const updatedProject = await project.update(newProject);
  return updatedProject;
}

export const removeProject = async (req: Request['body'], UserId: number) => {
  validateData(req, removeProjectRules);
  const { ProjectId } = req;
  const project = await isProjectBelongsToUser(ProjectId, UserId);

  const removedProject = await project.update({isDeleted: true});
  return removedProject;
}

//ProjectTask

/**
 * Проверка наличия прав на задание проекта у текущего пользователя. В случае успеха возвращает задание проекта.
 * @param ProjectTaskId 
 * @param UserId 
 * @returns 
 */
 export const isProjectTaskBelongsToUser = async (ProjectTaskId: number, UserId: number) => {
  if(!ProjectTaskId) throw { errorMessage: `Отсутствует идентификатор задания` };
  const projectTask = await ProjectTask.findOne({where: {id: ProjectTaskId}});
  if(!projectTask) throw { errorMessage: `Задание с идентификатором ${ProjectTaskId} не найдено` };

  const project = await Project.findOne({where: {id: projectTask.ProjectId}});
  if(!project) throw { errorMessage: `Проект с идентификатором ${projectTask.ProjectId} не найден` };
  if(project.UserId !== UserId) throw { errorMessage: 'Выбранный проект не принадлежит данному пользователю' };
  return projectTask;
}

export const createProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, createProjectTaskRules);
  const {description = '', label, date, points = 1, ProjectId} = req;  
  await isProjectBelongsToUser(ProjectId, UserId);

  const newProjectTask = {
    label,
    description,
    date,
    points,
    ProjectId,
    status: false,
  }

  const createdProject = await ProjectTask.create(newProjectTask);
  return createdProject;
}

export const updateProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, updateProjectTaskRules);
  const {description = '', label, date, points = 1, ProjectId, ProjectTaskId, status = false } = req;  
  await isProjectBelongsToUser(ProjectId, UserId);
  const projectTask = await isProjectTaskBelongsToUser(ProjectTaskId, UserId);

  const newProjectTask = {
    label,
    description,
    date,
    points,
    ProjectId,
    status,
  }

  const updatedProjectTask = await projectTask.update(newProjectTask);
  return updatedProjectTask;
}

export const removeProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, removeProjectTaskRules);
  const { ProjectTaskId } = req;
  const projectTask = await isProjectTaskBelongsToUser(ProjectTaskId, UserId);

  const removedProjectTask = await projectTask.update({isDeleted: true});
  return removedProjectTask;
}

export const addKidToProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, addKidToProjectTaskRules);
  const { ProjectTaskId, KidId: KidIds } = req;
  await isProjectTaskBelongsToUser(ProjectTaskId, UserId);

  for (const KidId of KidIds) {
    await isKidBelongsToUser(UserId, KidId);
  }

  const errors: string[] = [];
  const result: string[] = [];
  for (const KidId of KidIds) {
    const newKid = {
      KidId,
      ProjectTaskId,
    }

    const isAlreadyExist = await KidProjectTask.findOne({where: newKid});
    if(isAlreadyExist){
      errors.push(`Ученик ${KidId} уже добавлен к заданию ${ProjectTaskId}`)
    }else{
      const addedKid = await KidProjectTask.create(newKid);
      result.push(addedKid);
    }    
  }

  return {result, errors};
}