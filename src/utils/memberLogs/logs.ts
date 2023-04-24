import { Member, MemberLogs, Teacher, User } from "../../models";

export const createMembersChangeStatusLog = async (UserId: number, MemberId: number, status: boolean) => {
  const user = await User.findOne({ where: { id: UserId } });
  const member = await Member.findOne({ where: { id: MemberId } })
  if (user && member) {
    const log = `${user.surname} ${user.name} изменил статус ${member.surname} ${member.name} на ${status ? '"в строю"' : '"болеет"'}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const createMembersEditUserLog = async (UserId: number, member: typeof Member) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && member) {
    const log = `${user.surname} ${user.name} отредактировал кадета ${member.surname} ${member.name}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const createMembersAddUserLog = async (UserId: number, member: typeof Member) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && member) {
    const log = `${user.surname} ${user.name} добавил кадета ${member.surname} ${member.name}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const createMembersRemoveUserLog = async (UserId: number, member: typeof Member) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && member) {
    const log = `${user.surname} ${user.name} удалил кадета ${member.surname} ${member.name}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const createMembersConnectLog = async (UserId: number) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user) {
    const log = `${user.surname} ${user.name} подключился к таблице`;
    await MemberLogs.create({ UserId, log });
  }
}

export const createMembersDisconnectLog = async (UserId: number) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user) {
    const log = `${user.surname} ${user.name} отключился от таблицы`;
    await MemberLogs.create({ UserId, log });
  }
}

export const addTeacherLog = async (UserId: number, teacher: typeof Teacher) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && teacher) {
    const log = `${user.surname} ${user.name} добавил преподавателя ${teacher.surname} ${teacher.name} ${teacher.middlename}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const removeTeacherLog = async (UserId: number, teacher: typeof Teacher) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && teacher) {
    const log = `${user.surname} ${user.name} удалил преподавателя ${teacher.surname} ${teacher.name} ${teacher.middlename}`;
    await MemberLogs.create({ UserId, log });
  }
}

export const editTeacherLog = async (UserId: number, teacher: typeof Teacher) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (user && teacher) {
    const log = `${user.surname} ${user.name} отредактировал данные преподавателя ${teacher.surname} ${teacher.name} ${teacher.middlename}`;
    await MemberLogs.create({ UserId, log });
  }
}