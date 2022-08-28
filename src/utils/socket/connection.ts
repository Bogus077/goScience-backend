import { createMembersConnectLog, createMembersDisconnectLog } from "../memberLogs/logs"
import { membersHandler } from "./membersHandler"

// данная функция выполняется при подключении каждого сокета (обычно, один клиент = один сокет)
export const onConnection = (io: any, socket: any) => {
  // выводим сообщение о подключении пользователя
  console.log('=================================User connected===========================================')
  createMembersConnectLog(socket.jwt.id);

  // получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  // присоединяемся к комнате (входим в нее)
  socket.join(roomId)

  // регистрируем обработчики
  // обратите внимание на передаваемые аргументы
  membersHandler(io, socket);

  // обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('==============================User disconnected===================================')
    createMembersDisconnectLog(socket.jwt.id)
    socket.leave(roomId)
  })
}