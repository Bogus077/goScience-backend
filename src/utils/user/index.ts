import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules, userLoginRules, addRoleRules, addRoleToUserRules, userPasswordChangeRules, updateUserRules } from '../validationRules';
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

  if(user.isDeleted){
    throw { errorMessage: 'User was deleted' };
  }

  const logInResult = {
    accessToken: createToken(user),
    refreshToken: await createRefreshToken(user),
  };

  return logInResult;
}

/** Change user password */
export const userChangePassword = async (requestData: Request['body']) => {
  validateData(requestData, userPasswordChangeRules);

  const user = await User.findOne({ where: { phone: requestData.phone } })
  if (!user) {
    throw { errorMessage: 'User not found' };
  }

  if(user.isDeleted){
    throw { errorMessage: 'User was deleted' };
  }

  const password = await bcrypt.hash(requestData.password, 8);
  await user.update({password})

  return {result: 'success'};
}

/** User update */
export const updateUser = async (requestData: Request['body']) => {
  validateData(requestData, updateUserRules);

  const user = await User.findOne({ where: { phone: requestData.phone } })
  if (!user) {
    throw { errorMessage: 'User not found' };
  }

  if(user.isDeleted){
    throw { errorMessage: 'User was deleted' };
  }

  await user.update({name: requestData.name, surname: requestData.surname, middleName: requestData.middleName, phone: requestData.phone})

  return {result: 'success'};
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

  // Выдаём только роль офицера
  const newRole = await UserRole.create({ UserId, RoleId: 2 });

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