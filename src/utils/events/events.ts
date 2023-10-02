import { Request, Response } from 'express';
import { Event, EventMember, EventTeacher } from "../../models";
import { addEventLog, addTeacherLog, createMembersAddUserLog, editEventLog, editTeacherLog, removeEventLog, removeTeacherLog } from "../memberLogs/logs";
import { addEventRules, removeEventRules, updateEventRules, validateData } from "../validationRules";

export const addEvent = async (req: Request['body'], UserId: number) => {
  validateData(req, addEventRules);
  const { title, startAddress, finishAddress, createdDate, startDate, members, teachers } = req;

  const newEvent = {
    title, startAddress, finishAddress, createdBy: UserId, createdDate, startDate
  };

  if (!members || !Array.isArray(members)) {
    throw { errorMessage: 'Members is empty' }
  }

  if (!teachers || !Array.isArray(teachers)) {
    throw { errorMessage: 'Teachers is empty' }
  }

  const result = await Event.create(newEvent);

  // Добавляем записи об участниках
  await EventTeacher.bulkCreate(teachers.map((teacher) => ({ TeacherId: teacher, EventId: result.id })))
  await EventMember.bulkCreate(members.map((member) => ({ MemberId: member, EventId: result.id })))

  await addEventLog(UserId, result);
  return result;
}

export const updateEvent = async (req: Request['body'], UserId: number) => {
  validateData(req, updateEventRules);
  const { id, title, startAddress, finishAddress, createdDate, startDate, members, teachers } = req;

  const newEvent = {
    title, startAddress, finishAddress, createdBy: UserId, createdDate, startDate
  };

  if (!members || !Array.isArray(members)) {
    throw { errorMessage: 'Members is empty' }
  }

  if (!teachers || !Array.isArray(teachers)) {
    throw { errorMessage: 'Users is empty' }
  }

  const event = await Event.findOne({ where: { id } });

  if (!event) throw { errorMessage: 'Event not found' }
  const result = await event.update(newEvent);

  // Удаляем старые записи об участниках
  await EventTeacher.destroy({ where: { EventId: event.id } });
  await EventMember.destroy({ where: { EventId: event.id } });

  // Добавляем новые записи об участниках
  await EventTeacher.bulkCreate(teachers.map((teacher) => ({ TeacherId: teacher, EventId: result.id })))
  await EventMember.bulkCreate(members.map((member) => ({ MemberId: member, EventId: result.id })))

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
  await EventTeacher.destroy({ where: { EventId: event.id } });

  await removeEventLog(UserId, result);
  return result;
}