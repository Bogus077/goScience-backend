import { Request, Response } from 'express';
import { Kid, KidProjectTask, KidSummaryProjectTask, KidTeam, Member, Project, ProjectTask, Team } from '../../models';
import { validateData, addMemberRules, changeMemberStatusRules, removeMemberRules } from '../validationRules';

export const addMember = async (req: Request['body']) => {
  validateData(req, addMemberRules);
  const {name, surname, sex, plat} = req; 
  const newMember = {
    name,
    surname,
    sex,
    plat
  } 

  const result = await Member.create(newMember);
  return result;
}

export const removeMember = async (req: Request['body']) => {
  validateData(req, removeMemberRules);
  const { id } = req;  

  const member = await Member.findOne({ where: { id } });
  if(!member) throw { errorMessage: 'Member not found' }
  await member.update({isDeleted: true});

  return {result: 'deleted'};
}

export const changeMemberStatus = async (req: Request['body']) => {
  validateData(req, changeMemberStatusRules);
  const {id, status} = req;

  const member = await Member.findOne({where: {id}});
  if(!member) throw {errorMessage: 'Ученик не найден'};

  const newMember = {
    id,
    status: status ? true : null,
  }

  const result = await member.update(newMember);
  return result;
}