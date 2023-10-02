import { Request, Response } from 'express'
import { sequelize } from '../database/database.config';
import { JwtPayload } from '../middlewares/authJwt';
import { addEvent, removeEvent, updateEvent } from '../utils/events/events';
import { Event, Member, User } from '../models';

export async function getEventsRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await Event.findAll({ where: { isDeleted: false || null }, include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Member }] });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function addEventRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await addEvent(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateEventRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await updateEvent(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function removeEventRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const result = await removeEvent(req.body, req.jwt.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getEventAdressesRequest(req: Request & { jwt: JwtPayload }, res: Response) {
  try {
    const finishAddresses = await Event.findAll({ attributes: ['finishAddress'], group: ['finishAddress'] }).then((events) => events.map((event) => event.finishAddress));
    const startAddresses = await Event.findAll({ attributes: ['startAddress'], group: ['startAddress'] }).then((events) => events.map((event) => event.startAddress));
    const result = Array.from(new Set([...startAddresses, ...finishAddresses]));

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}