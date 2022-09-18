import { Member } from "../../models";
import { createMembersChangeStatusLog } from "../memberLogs/logs";
import { changeMemberStatus } from "../member/member";

export const membersHandler =  (io: any, socket: any) => {
  // Получение списка кадет
  const getMembers = async () => {
    const result = await Member.findAll({ where: {isDeleted: false || null}});

    io.in(socket.roomId).emit('members', result)
  }

  const changeStatus = async (data: {id: number, status: boolean}) => {
    await changeMemberStatus(data);
    await createMembersChangeStatusLog(socket.jwt.id, data.id, data.status);
    getMembers();
  }

  // регистрируем обработчики
  socket.on('members:get', getMembers);
  socket.on('members:status', changeStatus);
}