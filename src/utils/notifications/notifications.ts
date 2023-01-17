import { addNotificationRules, readNotificationRules, removeNotificationRules, validateData } from "../validationRules";
import { Request, Response } from 'express';
import { Notifications, UserNotifications } from "../../models";

export const createNotification = async (req: Request['body']) => {
  validateData(req, addNotificationRules);
  const { title, text, type = 'default' } = req;
  const newNotification = {
    title, text, type
  }

  const result = await Notifications.create(newNotification);
  return result;
}

export const readNotification = async (req: Request['body'], UserId: number) => {
  validateData(req, readNotificationRules);
  const { id } = req;

  const result = await UserNotifications.create({
    UserId,
    id
  })
  return result;
}

export const removeNotification = async (req: Request['body']) => {
  validateData(req, removeNotificationRules);
  const { id } = req;

  await Notifications.destroy({
    where: {
      id
    }
  })
  return { status: 'ok' };
}