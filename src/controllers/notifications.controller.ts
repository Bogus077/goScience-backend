import { Request, Response } from 'express'
import { Notifications } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { createNotification, readNotification, removeNotification } from '../utils/notifications/notifications';

export async function getAllNotificationsRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await Notifications.findAll({ limit: 3 });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createNotificationsRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await createNotification(req.body);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function readNotificationsRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await readNotification(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeNotificationsRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await removeNotification(req.body);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}