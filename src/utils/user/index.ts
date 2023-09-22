import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules, userLoginRules, addRoleRules, addRoleToUserRules } from '../validationRules';
import { sequelize } from '../../database/database.config';
import { User, Class, Role, UserRole } from '../../models/index';
import { createRefreshToken, createToken } from '../token';

/**
 * Registration for new User 
 * @param requestData 
 * @returns 
 */
export const signUpNewUser = async (requestData: Request['body']) => {
  validateData(requestData, userSignUpRules);

  const isPhoneExist = await checkIsPhoneAlreadyExist(requestData.phone);
  if (isPhoneExist.phoneExist) {
    throw { errorMessage: 'Телефон уже используется' };
  }

  requestData.password = await bcrypt.hash(requestData.password, 8);
  return await User.create(requestData);
}

/** LogIn: Check password and create access token */
export const UserlogIn = async (requestData: Request['body']) => {
  validateData(requestData, userLoginRules);

  const user = await User.findOne({ where: { phone: requestData.phone } })
  if (!user) {
    throw { errorMessage: 'User not found' };
  }

  await checkPassword(requestData.password, user);

  const logInResult = {
    accessToken: createToken(user),
    refreshToken: await createRefreshToken(user),
  };

  return logInResult;
}

/** Compare password via database */
export const checkPassword = async (password: string, user: User) => {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { errorMessage: `Invalid password` };
}

/** Check user phone number if it's already exists in DB */
export const checkIsPhoneAlreadyExist = async (phone: string) => {
  if (!phone) {
    throw { errorMessage: 'Телефон не указан' };
  }

  const user = await User.findOne({ where: { phone } });

  // if(user){
  //   throw { errorMessage: 'Телефон уже используется' };
  // }

  return { phoneExist: user ? user.id : false };
}

export const createRole = async (req: Request['body']) => {
  validateData(req, addRoleRules);
  const { name } = req;

  const newRole = await Role.create({ name });

  return newRole;
}

export const addRoleToUser = async (req: Request['body']) => {
  validateData(req, addRoleToUserRules);
  const { UserId, RoleId } = req;

  const newRole = await UserRole.create({ UserId, RoleId });

  return newRole;
}

export const removeRoleFromUser = async (req: Request['body']) => {
  validateData(req, addRoleToUserRules);
  const { UserId, RoleId } = req;

  const role = await UserRole.findOne({ where: { UserId, RoleId } });
  if (!role) throw { errorMessage: 'UserRole not found' };

  await role.destroy();

  return { result: 'deleted' };
}