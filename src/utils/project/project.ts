import { Request, Response } from 'express';
import { Kid, KidProjectTask, KidSummaryProjectTask, KidTeam, Project, ProjectTask, Team } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { isTeamBelongsToUser } from '../teams/teams';
import { validateData, createProjectRules, updateProjectRules, removeProjectRules, createProjectTaskRules, updateProjectTaskRules, removeProjectTaskRules, addKidToProjectTaskRules, getProjectTaskByIdRules, archiveProjectRules, doneProjectTaskRules } from '../validationRules';

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

export const archiveProject = async (req: Request['body'], UserId: number) => {
  validateData(req, archiveProjectRules);
  const { ProjectId } = req;
  const project = await isProjectBelongsToUser(ProjectId, UserId);

  const archivedProject = await project.update({archived: true});
  return archivedProject;
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
  const {description = '', label, date, points = 1, ProjectId, kids = []} = req;  
  await isProjectBelongsToUser(ProjectId, UserId);
  const newProjectTask = {
    label,
    description,
    date,
    points,
    ProjectId,
    status: false,
  }

  for (const KidId of kids) {
    await isKidBelongsToUser(UserId, KidId);
  }

  const createdProjectTask = await ProjectTask.create(newProjectTask);

  if (kids && createdProjectTask) {
    for (const KidId of kids) {
      const newKid = {
        KidId,
        ProjectTaskId: createdProjectTask.id,
      }
      await KidProjectTask.create(newKid);
    }    
  }

  return createdProjectTask;
}

export const updateProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, updateProjectTaskRules);
  const {description = '', label, date, points = 1, ProjectId, ProjectTaskId, status = false, kids = [] } = req;  
  await isProjectBelongsToUser(ProjectId, UserId);

  for (const KidId of kids) {
    await isKidBelongsToUser(UserId, KidId);
  }

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
  await KidProjectTask.destroy({where: {ProjectTaskId: updatedProjectTask.id}})

  if (kids && updatedProjectTask) {
    for (const KidId of kids) {
      const newKid = {
        KidId,
        ProjectTaskId: updatedProjectTask.id,
      }
      await KidProjectTask.create(newKid);
    }    
  }

  return updatedProjectTask;
}

export const removeProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, removeProjectTaskRules);
  const { ProjectTaskId } = req;
  const projectTask = await isProjectTaskBelongsToUser(ProjectTaskId, UserId);

  const removedProjectTask = await projectTask.update({isDeleted: true});
  return removedProjectTask;
}

export const doneProjectTask = async (req: Request['body'], UserId: number) => {
  validateData(req, doneProjectTaskRules);
  const { ProjectTaskId } = req;
  const projectTask = await isProjectTaskBelongsToUser(ProjectTaskId, UserId);

  const doneProjectTask = await projectTask.update({status: true});
  const kids = await KidProjectTask.findAll({where: {ProjectTaskId: doneProjectTask.id}});
  const kidIds = kids.map((kid: typeof KidProjectTask) => kid.KidId);
  console.log('===========');
  console.log(kidIds);
  
  for (const KidId of kidIds){
    await KidSummaryProjectTask.create({KidId: parseInt(KidId), label: doneProjectTask.label, points: doneProjectTask.points});
  }
  return doneProjectTask;
}

export const getProjectTaskById = async (req: Request['body'], UserId: number) => {
  validateData(req, getProjectTaskByIdRules);
  const { ProjectTaskId } = req;
  await isProjectTaskBelongsToUser(ProjectTaskId, UserId);
  const projectTask = await ProjectTask.findOne({
    where: {id: ProjectTaskId}, 
    include: [Kid],
  }) 

  return projectTask;
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