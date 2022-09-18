import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { TasksDay, TasksWeek, TasksQuarter, Member, MemberLogs } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { changeSummaryStatus, createKidUserSummary, getKidSummary } from '../utils/summary/summary';
import { addMember, changeMemberStatus, removeMember } from '../utils/member/member';

export async function getMembersRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await Member.findAll();

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function addMembersRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await addMember(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeMembersRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeMember(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function changeMemberStatusRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await changeMemberStatus(req.body);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getMembersLogsRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await MemberLogs.findAll({order: [['id', 'DESC']], limit: 100});

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}