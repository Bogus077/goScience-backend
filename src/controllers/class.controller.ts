import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { Class, Kid, TasksDay, TasksMonth, TasksQuarter, TasksWeek, User, UserClass } from '../models/index';
import { createToken } from '../utils/token';
import { changeClass, createNewClass, getCurrentClass } from '../utils/class';
import { JwtPayload } from '../middlewares/authJwt';

type UserWithClases = User & {Classes: Class[]};

export async function getAllUserClassesRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await User.findOne({
      where: { id: req.jwt.id },
      attributes: { exclude: ['password'] },
      include: [{
        model: Class,
        include: [{ model: Kid }]
      }],
      order: [
        [Class, Kid, 'id', 'asc']
      ]
    });

    res.status(200).send((result as UserWithClases)?.Classes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCurrentClassRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    // await TasksDay.destroy({where: {}});
    // await TasksWeek.destroy({where: {}});
    // await TasksMonth.destroy({where: {}});
    // await TasksQuarter.destroy({where: {}});

    const result = await getCurrentClass(req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createNewClassRequest(req: Request, res: Response) {
  try {
    const result = await createNewClass(req.body);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function changeClassRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await changeClass(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}