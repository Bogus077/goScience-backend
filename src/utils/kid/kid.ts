import { Request, Response } from 'express';
import { Kid } from '../../models';
import { validateData, createKidRules } from '../validationRules';

export const createNewKid = async (requestData: Request['body']) => {
  validateData(requestData, createKidRules);

  const newKid = await Kid.create(requestData);

  return newKid;
}