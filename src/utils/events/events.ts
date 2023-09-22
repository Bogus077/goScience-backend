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