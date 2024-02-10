import { Request, Response } from 'express';
import { Event, EventMember, EventUser} from "../../models";
import { addEventLog, createMembersAddUserLog, editEventLog, removeEventLog } from "../memberLogs/logs";
import { addEventRules, removeEventRules, updateEventRules, validateData } from "../validationRules";

export const addEvent = async (req: Request['body'], UserId: number) => {
  validateData(req, addEventRules);
  const { title, startAddress, finishAddress, orderDate, orderNumber, startDate, Members, Users } = req;

  const newEvent = {
    title, startAddress, finishAddress, createdBy: UserId, orderDate, orderNumber, startDate
  };

  if (!Members || !Array.isArray(Members)) {
    throw { errorMessage: 'Members is empty' }
  }

  if (!Users || !Array.isArray(Users)) {
    throw { errorMessage: 'Users is empty' }
  }

  const result = await Event.create(newEvent);

  // Добавляем записи об участниках
  await EventMember.bulkCreate(Members.map((member) => ({ MemberId: member, EventId: result.id })))
  await EventUser.bulkCreate(Users.map((user) => ({ UserId: user, EventId: result.id })))

  await addEventLog(UserId, result);
  return result;
}

export const updateEvent = async (req: Request['body'], UserId: number) => {
  validateData(req, updateEventRules);
  const { id, title, startAddress, finishAddress, orderDate, orderNumber, startDate, Members, Users } = req;

  const newEvent = {
    title, startAddress, finishAddress, createdBy: UserId, orderDate, orderNumber, startDate
  };

  if (!Members || !Array.isArray(Members)) {
    throw { errorMessage: 'Members is empty' }
  }

  if (!Users || !Array.isArray(Users)) {
    throw { errorMessage: 'Users is empty' }
  }

  const event = await Event.findOne({ where: { id } });

  if (!event) throw { errorMessage: 'Event not found' }
  const result = await event.update(newEvent);

  // Удаляем старые записи об участниках
  await EventMember.destroy({ where: { EventId: event.id } });
  await EventUser.destroy({ where: { EventId: event.id } });

  // Добавляем новые записи об участниках
  await EventMember.bulkCreate(Members.map((member) => ({ MemberId: member, EventId: result.id })))
  await EventUser.bulkCreate(Users.map((user) => ({ UserId: user, EventId: result.id })))

  await editEventLog(UserId, result);
  return result;
}

export const removeEvent = async (req: Request['body'], UserId: number) => {
  validateData(req, removeEventRules);
  const { id } = req;

  const event = await Event.findOne({ where: { id } });

  if (!event) throw { errorMessage: 'Event not found' }
  const result = await event.update({ isDeleted: true });
  await EventMember.destroy({ where: { EventId: event.id } });
  await EventUser.destroy({ where: { EventId: event.id } });

  await removeEventLog(UserId, result);
  return result;
}