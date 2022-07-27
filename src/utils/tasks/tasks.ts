import { Request, Response } from 'express';
import { Taskgroup, TasksDay, TasksWeek, TasksQuarter } from '../../models';
import { validateData, getTasksRules, createTaskgroupRules, createTaskRules } from '../validationRules';

export const getKidTasks = async (requestData: Request['body']) => {
  validateData(requestData, getTasksRules);

  const taskgroups = await Taskgroup.findAll({where: {KidId: requestData.KidId}, include: [TasksDay, TasksWeek, TasksQuarter]});

  return taskgroups;
}

export const createTaskGroup = async (requestData: Request['body']) => {
  validateData(requestData, createTaskgroupRules);

  const taskgroup = await Taskgroup.create(requestData);

  return taskgroup;
}

export const createTask = async (requestData: Request['body'], type: 'day' | 'week' | 'quarter') => {
  validateData(requestData, createTaskRules);

  if(type === 'day'){
    const task = await TasksDay.create(requestData);
    return task;
  }
  if(type === 'week'){
    const task = await TasksWeek.create(requestData);
    return task;
  }
  if(type === 'quarter'){
    const task = await TasksQuarter.create(requestData);
    return task;
  }
  
}