import { Member, MemberLogs, User } from "../../models";

export const createMembersChangeStatusLog = async (UserId: number, MemberId: number, status: boolean) => {
  const user = await User.findOne({ where: { id: UserId } });
  const member = await Member.findOne({ where: { id: MemberId } })
  if(user && member){
    const log = `${user.surname} ${user.name} изменил статус ${member.surname} ${member.name} на ${status ? '"в строю"' : '"болеет"'}`;
    await MemberLogs.create({UserId, log});
  }
}

export const createMembersConnectLog = async (UserId: number) => {
  const user = await User.findOne({ where: { id: UserId } });
  if(user){
    const log = `${user.surname} ${user.name} подключился к таблице`;
    await MemberLogs.create({UserId, log});
  }
}

export const createMembersDisconnectLog = async (UserId: number) => {
  const user = await User.findOne({ where: { id: UserId } });
  if(user){
    const log = `${user.surname} ${user.name} отключился от таблицы`;
    await MemberLogs.create({UserId, log});
  }
}