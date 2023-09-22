import { Request, Response } from 'express';
import { Kid, KidProjectTask, KidSummaryProjectTask, KidTeam, Member, MemberAttendance, MemberContact, Project, ProjectTask, Team } from '../../models';
import { createMembersAddUserLog, createMembersEditUserLog, createMembersRemoveUserLog } from '../memberLogs/logs';
import { validateData, addMemberRules, changeMemberStatusRules, removeMemberRules, editMemberRules, memberAttendanceRules } from '../validationRules';
import { transliterate as tr, slugify } from 'transliteration';
import { Op } from "sequelize";

// Добавление сгенерированных почтовых адресов
// export const addEmails = async () => {
//   const members = await Member.findAll();
//   members.map((member: any) => {
//     const email = `${slugify(`${member.surname} ${member.name}`)}@kk-a.ru`
//     Member.update({ email, password: 'kkUnost123' }, { where: { id: member.id } })
//   })
// }

// Удаление старой статистики посещений
// export const clearAttendanceStats = async () => {
//   const date = new Date(2023, 8, 1);
//   const result = await MemberAttendance.destroy({
//     where: {
//       createdAt: {
//         [Op.lt]: date
//       }
//     }
//   });
// }



export const addMember = async (req: Request['body'], UserId: number) => {
  validateData(req, addMemberRules);
  const { name, surname, sex, plat, dob, contactName, contactPhone, contactAddress } = req;
  const email = `${slugify(`${surname} ${name}`)}@kk-a.ru`
  const newMember = {
    name,
    surname,
    sex,
    plat,
    dob,
    email,
    password: 'kkUnost123'
  } as Member

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
  } as unknown as Member;

  const result = await member.update(newMember);
  return result;
}

export const editMember = async (req: Request['body'], UserId: number) => {
  validateData(req, editMemberRules);
  const { id, name, surname, sex, plat, dob, contactName, contactPhone, contactAddress, email, password } = req;

  const member = await Member.findOne({ where: { id } });
  if (!member) throw { errorMessage: 'Ученик не найден' };

  const newMember = {
    name,
    surname,
    sex,
    plat,
    dob,
    email,
    password
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
  if (memberContact) await memberContact.update({
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
    const attendance = members.map((member: Member) => {
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
