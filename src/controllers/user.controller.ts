import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { UserModel } from '../models/index';
import { checkIsPhoneAlreadyExist, signUpNewUser, UserlogIn } from '../utils/user';
import { createToken } from '../utils/token';

export async function signUpRequest(req: Request, res: Response) {
  try{
    const createdUser = await signUpNewUser(req.body);
    const result = {
      id: createdUser.id,
      name: createdUser.name,
      lastName: createdUser.lastName,
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
    const result = await checkIsPhoneAlreadyExist(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function logInRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await UserlogIn(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
