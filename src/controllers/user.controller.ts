import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Class,  Kid,  Role,  TasksDay,  TasksMonth,  TasksQuarter,  TasksWeek,  User, UserSettings } from '../models/index';
import { addRoleToUser, checkIsPhoneAlreadyExist, createRole, removeRoleFromUser, signUpNewUser, UserlogIn } from '../utils/user';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';

export async function getAllUsersRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await User.findAll({
      attributes: { exclude: ['password'] },
      include: {
        model: Class,
      }
    });

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getUserRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await User.findOne({ 
      where: {id: req.jwt.id},
      attributes: { exclude: ['password'] },
      include: [
        {
          model: UserSettings, 
          include: {
            model: Class, 
            include: {
              model: Kid,
              include:  [TasksDay, TasksWeek, TasksMonth, TasksQuarter]
            }
          }
        },
        {model: Class},
        {model: Role}
      ]
    });

    if(!result){
      res.status(401).send({error: {message: 'User not found', status: 151} });
      return;
    }

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function signUpRequest(req: Request, res: Response) {
  try{
    const createdUser = await signUpNewUser(req.body);
    const result = {
      id: createdUser.id,
      name: createdUser.name,
      surname: createdUser.surname,
      phone: createdUser.phone,
      accessToken: createToken(createdUser),
      refreshToken: await createRefreshToken(createdUser),
    }

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function checkIsPhoneAlreadyExistRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await checkIsPhoneAlreadyExist(requestData.phone);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function signInRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await UserlogIn(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function createRoleRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await createRole(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addRoleToUserRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await addRoleToUser(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeRoleFromUserRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await removeRoleFromUser(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
