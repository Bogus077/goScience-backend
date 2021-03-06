import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { Class,  Kid,  Taskgroup,  TasksDay,  TasksQuarter,  TasksWeek,  User, UserSettings } from '../models/index';
import { checkIsPhoneAlreadyExist, signUpNewUser, UserlogIn } from '../utils/user';
import { createToken } from '../utils/token';

export async function getAllUsersRequest(req: Request & {jwt: any}, res: Response) {
  try{
    const result = await User.findAll({
      attributes: { exclude: ['password'] },
      include: {
        model: Class,
      }
    });
    console.log(req.jwt);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getUserRequest(req: Request & {jwt: any}, res: Response) {
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
              include: {
                model: Taskgroup,
                include: [TasksDay, TasksWeek, TasksQuarter]
              }
            }
          }
        },
        {model: Class}
      ]
    });

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
