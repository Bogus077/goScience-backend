import { Request, Response } from 'express';
import { JwtPayload } from 'src/middlewares/authJwt';
import { Class, Kid, User } from '../../models';
import { validateData, createKidRules, updateKidRules, kidPhoneRules, removeKidRules } from '../validationRules';

export const isKidBelongsToUser = async (userId: number, kidId: number) => {

  const kid = await Kid.findOne({where: {id: kidId}, include: {model: Class, include: {model: User}}});
  if(!kid) throw { errorMessage: 'Ученик не найден' };
  
  const users = kid.Class.Users.map((user: typeof User) => user.id);

  const isBelongs = users.includes(userId);

  if(!isBelongs) throw { errorMessage: 'Ученик не в вашем классе' };

  return isBelongs;
}

export const checkKidPhone = async (requestData: Request['body']) => {
  validateData(requestData, kidPhoneRules);

  const result = await Kid.findAll({where: {phone: requestData.phone}})

  return result.length > 0 ? true : false;
}

export const createNewKid = async (requestData: Request['body']) => {
  validateData(requestData, createKidRules);

  if(requestData.phone){
    const check = await checkKidPhone(requestData);
    if(check) throw { errorMessage: 'Телефон уже зарегистрирован' };
  }
  const newKid = await Kid.create(requestData);

  return newKid;
}

export const updateKid = async (requestData: Request['body']) => {
  validateData(requestData, updateKidRules);

  const kid = await Kid.findOne({where: {id: requestData.id}});
  if(!kid){
    throw { errorMessage: 'Ученик не найден' };
  }
  const result = kid.update(requestData);

  return result;
}

export const removeKid = async (requestData: Request['body']) => {
  validateData(requestData, removeKidRules);

  await Kid.destroy({where: {id: requestData.id}});

  return {data: 'removed'};
}