import { Request, Response } from 'express';
import { Class, User, UserClass, UserSettings } from '../../models';
import { validateData, createClassRules, changeClassRules } from '../validationRules';

export const isClassBelongsToUser = async (UserId: number, ClassId: number) => {

  const userClasses = await UserClass.findAll({where: {UserId}});
  if(userClasses.length === 0) throw { errorMessage: 'У пользователя нет ни одного класса' };

  const userClassIds = userClasses.map((c: typeof UserClass) => c.ClassId);

  const isBelongs = userClassIds.includes(ClassId);
  if(!isBelongs) throw { errorMessage: 'У Вас нет доступа к данному классу' };

  return isBelongs;
}

export const createNewClass = async (requestData: Request['body']) => {
  validateData(requestData, createClassRules);

  const newClass = await Class.create({label: requestData.label}); 
  await UserClass.create({UserId: requestData.userId, ClassId: newClass.id});
  const userSettings = await UserSettings.findOne({where: {UserId: requestData.userId}});
  if(userSettings){
    await userSettings.update({ClassId: newClass.id})
  }else{
    await UserSettings.create({UserId: requestData.userId, ClassId: newClass.id})
  }

  return newClass;
}

export const changeClass = async (requestData: Request['body'], UserId: number) => {
  validateData(requestData, changeClassRules);
  const ClassId = requestData.id;

  await isClassBelongsToUser(UserId, ClassId);
  const userSettings = await UserSettings.findOne({where: {UserId}});
  const result = await userSettings.update({ClassId: ClassId})

  return result;
}