import { Request, Response } from 'express';
import { TasksDay, TasksWeek, TasksQuarter, TasksMonth, Kid, UserSettings, Class } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, getTasksRules, createTaskgroupRules, createTaskRules } from '../validationRules';

export const updatePointsMonth = async (TasksQuarterId: number, points: number, type: 'add' | 'remove') => {
  if(!TasksQuarterId || !points) return;

  const taskQuarter = await TasksQuarter.findOne({where: {id: TasksQuarterId}});
  if (taskQuarter){
    await taskQuarter.update({points: type === 'add' ? taskQuarter.points + points : taskQuarter.points - points})
  }
}

export const updatePointsWeek = async (TasksMonthId: number, points: number, type: 'add' | 'remove') => {
  if(!TasksMonthId || !points) return;

  const taskMonth = await TasksMonth.findOne({where: {id: TasksMonthId}});
  if (taskMonth){
    await taskMonth.update({points: type === 'add' ? taskMonth.points + points : taskMonth.points - points})

    if(taskMonth.TasksQuarterId) await updatePointsMonth(taskMonth.TasksQuarterId, points, type);
  }
}

export const updatePointsDay = async (TasksWeekId: number, points: number, type: 'add' | 'remove') => {
  if(!TasksWeekId || !points) return;

  const taskWeek = await TasksWeek.findOne({where: {id: TasksWeekId}});
  if (taskWeek){
    await taskWeek.update({points: type === 'add' ? taskWeek.points + points : taskWeek.points - points})
    
    if(taskWeek.TasksMonthId) await updatePointsWeek(taskWeek.TasksMonthId, points, type);
  }
}

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
    if(task.TasksWeekId){
    await updatePointsDay(task.TasksWeekId, task.points, 'add');
  }

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