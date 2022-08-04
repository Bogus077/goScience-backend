import { Request, Response } from 'express'
import { StatsTask } from '../models/index';
import { JwtPayload } from 'src/middlewares/authJwt';

export async function getUserStats(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await StatsTask.findAll({where: {UserId: req.jwt.id}});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}