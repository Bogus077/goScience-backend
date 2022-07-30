import { Request, Response } from 'express';
import { TasksDay, TasksWeek, TasksQuarter, TasksMonth, Kid, UserSettings, Class } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, getTasksRules, createTaskgroupRules, createTaskRules } from '../validationRules';

export const getKidTasks = async (requestData: Request['body']) => {
  validateData(requestData, getTasksRules);

  const KidTasks = await Kid.findOne({where: {id: requestData.KidId}, attributes: ['id', 'name', 'surname'], include: [TasksDay, TasksWeek, TasksMonth, TasksQuarter]});

  return KidTasks;
}

export const createTask = async (requestData: Request['body'], type: 'day' | 'week' | 'month' | 'quarter', UserId: number) => {
  validateData(requestData, createTaskRules);

  const kid = await Kid.findOne({where: {id: requestData.KidId}});
  if(!kid) throw { errorMessage: 'Ученик не найден' };

  await isKidBelongsToUser(UserId, kid.id);

  if(type === 'day'){
    const task = await TasksDay.create({...requestData, points: requestData.points ?? 1});
    return task;
  }
  if(type === 'week'){
    const task = await TasksWeek.create(requestData);
    return task;
  }
  if(type === 'month'){
    const task = await TasksMonth.create(requestData);
    return task;
  }
  if(type === 'quarter'){
    const task = await TasksQuarter.create(requestData);
    return task;
  }  
}