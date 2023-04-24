import { Request, Response } from 'express';
import { Teacher } from "../../models";
import { addTeacherLog, createMembersAddUserLog, editTeacherLog, removeTeacherLog } from "../memberLogs/logs";
import { addTeacherRules, editTeacherRules, removeTeacherRules, validateData } from "../validationRules";

export const addTeacher = async (req: Request['body'], UserId: number) => {
  validateData(req, addTeacherRules);
  const { name, surname, middlename, phone } = req;
  const newTeacher = {
    name,
    surname,
    middlename,
    phone,
  };

  const result = await Teacher.create(newTeacher);

  await addTeacherLog(UserId, result);
  return result;
}

export const removeTeacher = async (req: Request['body'], UserId: number) => {
  validateData(req, removeTeacherRules);
  const { id } = req;
  const teacher = await Teacher.findOne({ where: { id } })
  if (!teacher) throw { errorMessage: 'Teacher not found' }

  const result = await teacher.update({ isDeleted: true });

  await removeTeacherLog(UserId, result);
  return result;
}

export const editTeacher = async (req: Request['body'], UserId: number) => {
  validateData(req, editTeacherRules);
  const { id, name, surname, middlename, phone } = req;
  const newTeacher = {
    name,
    surname,
    middlename,
    phone,
  };

  const teacher = await Teacher.findOne({ where: { id } });
  if (!teacher) throw { errorMessage: 'Teacher not found' }

  const result = await teacher.update(newTeacher);

  await editTeacherLog(UserId, result);
  return result;
}