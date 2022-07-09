import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules, userLoginRules } from '../validationRules';
import {sequelize} from '../../database/database.config';
import { UserModel } from '../../models/index';
import { createToken } from '../token';

/** Registration for new User */
export const signUpNewUser = async (requestData: Request['body']) => {
  validateData(requestData, userSignUpRules);

  requestData.password = await bcrypt.hash(requestData.password, 8);
  return await UserModel.create(requestData);
}

/** LogIn: Check password and create access token */
export const UserlogIn = async (requestData: Request['body']) => {
  validateData(requestData, userLoginRules);

  const user = await UserModel.findOne({where: {phone: requestData.phone}})
  if(!user){
    throw { errorMessage: 'User not found' };
  }
   
  await checkPassword(requestData.password, user);

  const logInResult = {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    phone: user.phone,
    accessToken: createToken(user),
  };

  return logInResult;
}

/** Compare password via database */
export const checkPassword = async (password: string, user: typeof UserModel) => {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { errorMessage: `Invalid password` };
}

/** Check user phone number if it's already exists in DB */
export const checkIsPhoneAlreadyExist = async (requestData: Request['body']) => {
  const user = await UserModel.findOne({where: {phone: requestData.phone}});
  if(!user){
    throw { errorMessage: 'User not found' };
  }

  return user.name;
}