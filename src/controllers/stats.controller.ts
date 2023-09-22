import { Request, Response } from 'express'
import { StatsTask } from '../models/index';
import { JwtPayload } from 'src/middlewares/authJwt';
import { Op } from 'sequelize';

export async function getUserStats(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setSeconds(-1);

    const result = await StatsTask.findAll({
      where: {
        UserId: req.jwt.id,
        updatedAt: {
          [Op.gte]: today,
        }
      },
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}