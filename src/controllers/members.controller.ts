import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { TasksDay, TasksWeek, TasksQuarter, Member, MemberLogs } from '../models/index';
import { JwtPayload } from '../middlewares/authJwt';
import { changeSummaryStatus, createKidUserSummary, getKidSummary } from '../utils/summary/summary';
import { addMember, changeMemberStatus, editMember, removeMember } from '../utils/member/member';
import { Op, Sequelize } from 'sequelize/dist';

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
    const result = await addMember(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function removeMembersRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await removeMember(req.body, req.jwt.id);

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

export async function editMemberRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    const result = await editMember(req.body, req.jwt.id);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function getMembersLogsRequest(req: Request & {jwt: JwtPayload}, res: Response) {
  try{
    console.log(req.query);
    const {limit = 100, UserId, log} = req.query;
    let filters = {};
    if(UserId) filters = {...filters, UserId};
    if(log) filters = {...filters, log: {[Op.iLike]: `%${log}%`}};


    const result = await MemberLogs.findAll(
      {
        where: filters, 
        order: [['id', 'DESC']], 
        limit
      });

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}