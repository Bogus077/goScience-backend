import { Request, Response } from 'express';
import { Kid, KidProjectTask, KidSummaryProjectTask, KidTeam, Member, MemberAttendance, MemberContact, Project, ProjectTask, Team } from '../../models';
import { createMembersAddUserLog, createMembersEditUserLog, createMembersRemoveUserLog } from '../memberLogs/logs';
import { validateData, addMemberRules, changeMemberStatusRules, removeMemberRules, editMemberRules, memberAttendanceRules } from '../validationRules';

export const addMember = async (req: Request['body'], UserId: number) => {
  validateData(req, addMemberRules);
  const { name, surname, sex, plat, dob, contactName, contactPhone, contactAddress } = req;
  const newMember = {
    name,
    surname,
    sex,
    plat,
    dob
  }

  const result = await Member.create(newMember);

  if (contactName || contactPhone || contactAddress) {
    await MemberContact.create({
      MemberId: result.id,
      name: contactName ?? '',
      phone: contactPhone ?? '',
      address: contactAddress ?? '',
    })
  }

  await createMembersAddUserLog(UserId, result);
  return result;
}

export const removeMember = async (req: Request['body'], UserId: number) => {
  validateData(req, removeMemberRules);
  const { id } = req;

  const member = await Member.findOne({ where: { id } });
  if (!member) throw { errorMessage: 'Member not found' }
  await member.update({ isDeleted: true });
  await createMembersRemoveUserLog(UserId, member);


  return { result: 'deleted' };
}

export const changeMemberStatus = async (req: Request['body']) => {
  validateData(req, changeMemberStatusRules);
  const { id, status } = req;

  const member = await Member.findOne({ where: { id } });
  if (!member) throw { errorMessage: 'Ученик не найден' };

  const newMember = {
    id,
    status: status ? true : null,
  }

  const result = await member.update(newMember);
  return result;
}

export const editMember = async (req: Request['body'], UserId: number) => {
  validateData(req, editMemberRules);
  const { id, name, surname, sex, plat, dob, contactName, contactPhone, contactAddress } = req;

  const member = await Member.findOne({ where: { id } });
  if (!member) throw { errorMessage: 'Ученик не найден' };

  const newMember = {
    name,
    surname,
    sex,
    plat,
    dob
  };

  const result = await member.update(newMember);

  await MemberContact.findOrCreate({
    where: {
      MemberId: member.id
    },
    defaults: {
      MemberId: member.id,
      name: contactName ?? '',
      phone: contactPhone ?? '',
      address: contactAddress ?? '',
    }
  })

  const memberContact = await MemberContact.findOne({
    where: {
      MemberId: id,
    }
  })
  await memberContact.update({
    name: contactName ?? '',
    phone: contactPhone ?? '',
    address: contactAddress ?? '',
  })


  await createMembersEditUserLog(UserId, result)
  return result;
}

export const dailyAttendance = async () => {
  try {
    const members = await Member.findAll({ where: { isDeleted: false || null } });
    const attendance = members.map((member: typeof Member) => {
      return {
        MemberId: member.id,
        type: member.status ? 'in' : 'out',
      }
    })
    await MemberAttendance.bulkCreate(attendance);
  } catch (error) {
    console.log(error);
  }
}

export const memberAttendance = async (req: Request['body']) => {
  validateData(req, memberAttendanceRules);
  const { id } = req;

  const result = await MemberAttendance.findAll({ where: { MemberId: id } });
  return result;
}
