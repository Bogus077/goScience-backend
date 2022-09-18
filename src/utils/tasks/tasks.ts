import { Request, Response } from 'express';
import { TasksDay, TasksWeek, TasksQuarter, TasksMonth, Kid, UserSettings, Class, StatsTask, KidSummaryTask } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, getTasksRules, createTaskgroupRules, createTaskRules, changeTaskStatusRules, removeTaskRules } from '../validationRules';
import { v4 as uuidv4 } from 'uuid';

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

const getKidTaskWeekId = async (task: Request['body'], errors: string[], kid: typeof Kid) => {
  const taskWeek = await TasksWeek.findOne({where: {id: task.TasksWeekId}});

    if(!taskWeek){
      errors.push(`Недельная задача с идентификатором ${task.TasksWeekId} не найдена`);
      return null;
    }else{
      const taskWeekId = await TasksWeek.findOne({where: {taskgroupId: taskWeek.taskgroupId, KidId: task.KidId}});
      if(!taskWeekId){
        const newTaskWeek = {
          KidId: task.KidId,
          TasksMonthId: taskWeek.TasksMonthId,
          label: taskWeek.label,
          description: taskWeek.description,
          date: taskWeek.date,
          status: taskWeek.status,
        }
        const newWeek = await createWeekTask(newTaskWeek, taskWeek.taskgroupId, errors, kid);

        errors.push(`Недельная задача ${taskWeek.label} не найдена у ученика ${kid.surname} ${kid.name}. Поэтому она была создана в процессе добавления данной задачи.`);
        return newWeek.id;
      }
      return taskWeekId.id;
    }
}

/**
 * Создание дневной задачи
 * @param task
 * @param taskgroupId 
 * @param errors 
 * @returns 
 */
const createDayTask = async (task: Request['body'], taskgroupId: string, errors: string[], kid: typeof Kid) => {
  if(task.TasksWeekId){
    const taskWeekId = await getKidTaskWeekId(task, errors, kid);
    task.TasksWeekId = taskWeekId;
  }

  const newTask = await TasksDay.create({...task, points: task.points ?? 1, taskgroupId});
    if(task.TasksWeekId){
    await updatePointsDay(task.TasksWeekId, task.points, 'add');
  }

  return newTask;
}

const getKidTaskMonthId = async (task: Request['body'], errors: string[], kid: typeof Kid) => {
  const taskMonth = await TasksMonth.findOne({where: {id: task.TasksMonthId}});

    if(!taskMonth){
      errors.push(`Месячная задача с идентификатором ${task.TasksMonthId} не найдена`);
      return null;
    }else{
      const taskMonthId = await TasksMonth.findOne({where: {taskgroupId: taskMonth.taskgroupId, KidId: task.KidId}});
      if(!taskMonthId){
        const newTaskMonth = {
          KidId: task.KidId,
          TasksQuarterId: taskMonth.TasksQuarterId,
          label: taskMonth.label,
          description: taskMonth.description,
          date: taskMonth.date,
          status: taskMonth.status,
        }
        const newMonth = await createMonthTask(newTaskMonth, taskMonth.taskgroupId, errors, kid);

        errors.push(`Месячная задача ${taskMonth.label} не найдена у ученика ${kid.surname} ${kid.name}. Поэтому она была создана в процессе добавления данной задачи.`);
        return newMonth.id;
      }
      return taskMonthId.id;
    }
}

/**
 * Создание недельной задачи
 * @param task
 * @param taskgroupId 
 * @param errors 
 * @returns 
 */
const createWeekTask = async (task: Request['body'], taskgroupId: string, errors: string[], kid: typeof Kid) => {
  if(task.TasksMonthId){
    const taskMonthId = await getKidTaskMonthId(task, errors, kid);
    task.TasksMonthId = taskMonthId;
  }

  const newTask = await TasksWeek.create({...task, taskgroupId});

  return newTask;
}

const getKidTaskQuarterId = async (task: Request['body'], errors: string[], kid: typeof Kid) => {
  const taskQuarter = await TasksQuarter.findOne({where: {id: task.TasksQuarterId}});

    if(!taskQuarter){
      errors.push(`Четвертная задача с идентификатором ${task.TasksQuarterId} не найдена`);
      return null;
    }else{
      const taskQuarterId = await TasksQuarter.findOne({where: {taskgroupId: taskQuarter.taskgroupId, KidId: task.KidId}});
      if(!taskQuarterId){
        const newTaskQuarter = {
          KidId: task.KidId,
          label: taskQuarter.label,
          description: taskQuarter.description,
          date: taskQuarter.date,
          status: taskQuarter.status,
        }
        const newQuarter = await createQuarterTask(newTaskQuarter, taskQuarter.taskgroupId, errors);
  
        errors.push(`Четвертная задача ${taskQuarter.label} не найдена у ученика ${kid.surname} ${kid.name}. Поэтому она была создана в процессе добавления данной задачи.`);
        return newQuarter.id;
      }
      return taskQuarterId.id;
    }
}

/**
 * Создание месячной задачи
 * @param task
 * @param taskgroupId 
 * @param errors 
 * @returns 
 */
const createMonthTask = async (task: Request['body'], taskgroupId: string, errors: string[], kid: typeof Kid) => {
  if(task.TasksQuarterId){
    const tasksQuarterId = await getKidTaskQuarterId(task, errors, kid);
    task.TasksQuarterId = tasksQuarterId;
  }

  const newTask = await TasksMonth.create({...task, taskgroupId});

  return newTask;
}

const createQuarterTask = async (task: Request['body'], taskgroupId: string, errors: string[]) => {
  const newTask = await TasksQuarter.create({...task, taskgroupId});

  return newTask;
}

export const createTask = async (requestData: Request['body'], type: 'day' | 'week' | 'month' | 'quarter', UserId: number) => {
  validateData(requestData, createTaskRules);
  if(!requestData.KidId || requestData.KidId.length === 0) throw { errorMessage: 'Не выбран ученик, которому добавляется задание' };
  const taskgroupId = uuidv4();
  const errors: string[] = [];
  const result: typeof TasksDay[] = [];

  for (const requestKidId of requestData.KidId) {
    const task = {...requestData, KidId: requestKidId};

    const kid = await Kid.findOne({where: {id: task.KidId}});
    if(!kid) {
      errors.push(`Ученик с идентификатором ${task.KidId} не найден`);
      return;
    };

    await isKidBelongsToUser(UserId, task.KidId);


    if(type === 'day'){
      const newTask = await createDayTask(task, taskgroupId, errors, kid);
      result.push(newTask);
    }
    if(type === 'week'){
      const newTask = await createWeekTask(task, taskgroupId, errors, kid);
      result.push(newTask);
    }
    if(type === 'month'){
      const newTask = await createMonthTask(task, taskgroupId, errors, kid);
      result.push(newTask);
    }
    if(type === 'quarter'){
      const newTask = await createQuarterTask(task, taskgroupId, errors);
      result.push(newTask);
    }  
  };

  return {
    addedTasks: result,
    errors
  };
}

export const changeTaskStatus = async (requestData: Request['body'], UserId: number) => {
  validateData(requestData, changeTaskStatusRules);
  console.log('====================')
  console.log('====================')
  console.log('====================')
console.log(requestData);

  console.log('====================')
  console.log('====================')
  console.log('====================')


  switch(requestData.type){
    case "day":
      const taskDay = await TasksDay.findOne({where: {id: requestData.id}})
      if(!taskDay) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskDay.KidId);
      
      if(requestData.status === true && taskDay.status === false && taskDay.TasksWeekId){
        await updatePointsDay(taskDay.TasksWeekId, taskDay.points, 'remove');
      }else if (requestData.status === false && taskDay.status === true){
        await updatePointsDay(taskDay.TasksWeekId, taskDay.points, 'add');

        const statsToDelete = await StatsTask.findOne({where: {TasksDayId: taskDay.id}});
        if(statsToDelete) await statsToDelete.destroy();
      }

      //stats
      await StatsTask.create({UserId, KidId: taskDay.KidId, TasksDayId: taskDay.id, points: taskDay.points});
      await KidSummaryTask.create({KidId: taskDay.KidId, label: taskDay.label, points: taskDay.points});

      return await taskDay.update({status: requestData.status});
    case "week":
      const taskWeek = await TasksWeek.findOne({where: {id: requestData.id}})
      if(!taskWeek) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskWeek.KidId);
      //stats
      if(requestData.status === true && taskWeek.status === false){
        await KidSummaryTask.create({KidId: taskWeek.KidId, label: taskWeek.label, points: taskWeek.points});
      }
      return await taskWeek.update({status: requestData.status});
    case "month":
      const taskMonth = await TasksMonth.findOne({where: {id: requestData.id}})
      if(!taskMonth) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskMonth.KidId);
      //stats
      if(requestData.status === true && taskMonth.status === false){
        await KidSummaryTask.create({KidId: taskMonth.KidId, label: taskMonth.label, points: taskMonth.points});
      }
      return await taskMonth.update({status: requestData.status});
    case "quarter":
      const taskQuarter = await TasksQuarter.findOne({where: {id: requestData.id}})
      if(!taskQuarter) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskQuarter.KidId);
      //stats
      if(requestData.status === true && taskQuarter.status === false){
        await KidSummaryTask.create({KidId: taskQuarter.KidId, label: taskQuarter.label, points: taskQuarter.points});
      }
      return await taskQuarter.update({status: requestData.status});
  }
}

export const removeTask = async (requestData: Request['body'], UserId: number) => {
  validateData(requestData, removeTaskRules);

  switch(requestData.type){
    case "day":
      const taskDay = await TasksDay.findOne({where: {id: requestData.id}})
      if(!taskDay) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskDay.KidId);

      if(taskDay.status === false && taskDay.TasksWeekId){
        await updatePointsDay(taskDay.TasksWeekId, taskDay.points, 'remove');
      }

      return await taskDay.destroy();
    case "week":
      const taskWeek = await TasksWeek.findOne({where: {id: requestData.id}})
      if(!taskWeek) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskWeek.KidId);

      // if(taskWeek.status === false && taskWeek.TasksMonthId){
      //   await updatePointsWeek(taskWeek.TasksMonthId, taskWeek.points, 'remove');
      // }

      return await taskWeek.update({isDeleted: true});
    case "month":
      const taskMonth = await TasksMonth.findOne({where: {id: requestData.id}})
      if(!taskMonth) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskMonth.KidId);

      // if(taskMonth.status === false && taskMonth.TasksQuarterId){
      //   await updatePointsWeek(taskMonth.TasksQuarterId, taskMonth.points, 'remove');
      // }

      return await taskMonth.update({isDeleted: true});
    case "quarter":
      const taskQuarter = await TasksQuarter.findOne({where: {id: requestData.id}})
      if(!taskQuarter) throw { errorMessage: 'Задание не найдено' };
      await isKidBelongsToUser(UserId, taskQuarter.KidId);
      return await taskQuarter.update({isDeleted: true});
  }
}
