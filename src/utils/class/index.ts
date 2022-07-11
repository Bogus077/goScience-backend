import { Request, Response } from 'express';
import { Class, UserClass } from '../../models';
import { validateData, createClassRules } from '../validationRules';

export const createNewClass = async (requestData: Request['body']) => {
  validateData(requestData, createClassRules);

  const newClass = await Class.create({label: requestData.label}); 
  await UserClass.create({UserId: requestData.userId, ClassId: newClass.id});

  return newClass;
}