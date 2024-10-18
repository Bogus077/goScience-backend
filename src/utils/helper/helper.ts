import { Request, Response } from 'express';
import { validateData } from '../validationRules';
import OpenAI from 'openai';
import { openAiKey } from '../../config/config';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import fs from 'fs';
import { Marks, OpenAiHash, Threads } from '../../models';
import { JwtPayload } from '../../middlewares/authJwt';
import crypto from 'crypto';
import { Op } from 'sequelize';

const openai = new OpenAI({
  organization: 'org-fFeCsfdDRZwqxSrCeOrsdpZw',
  project: 'proj_I3XIjQQG7ezXYSVfOf2lQR2z',
  apiKey: openAiKey,
  // apiKey: OPENAI_API_KEY_Proxy,
  // baseURL: "https://api.proxyapi.ru/openai/v1/",
  httpAgent: HttpsProxyAgent(
    'http://yxhPUBNsXZgd98Rb:GfcM2Kn5WatDerSH@proxy1.accessai.ru:1080'
  ),
});

export function setAssistantHeaders(res: Response) {
  // Устанавливаем заголовки для SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Отправляем заголовки сразу
}

export const apiAssistantModel: OpenAI.Chat.ChatModel | (string & {}) =
  'gpt-4o-mini';

export const ASSISTANTS = {
  default: 'KK-A Assistant',
  tasks: 'Task Assistant',
  marks: 'Marks Assistant',
};

export async function getAssistant(
  ASSISTANT_NAME: string | undefined = ASSISTANTS.default
) {
  // set up the Assistant - assistants are persistent, only create once!
  let assistant = null;

  // retrieve or create the assistant
  let assistants = await openai.beta.assistants.list();
  assistant = assistants.data.find(
    (assistant) => assistant.name == ASSISTANT_NAME
  );

  if (assistant == null) {
    assistant = await openai.beta.assistants.create({
      name: ASSISTANT_NAME,
      instructions:
        'Ты являешься ассистентом на сайте для педагогов и офицеров-воспитателей кадетского корпуса. Дети в корпусе находятся круглосуточно и являются кадетами. Педагогов волнуют вопросы воспитания и успеваемости детей. Используй для форматирования текста html-теги, чтобы я мог вывести это на сайте в удобном для чтения виде. Вместо "\n", используй "<br>", вместо **пример заголовка** используй <b>Пример заголовка</b> и т.д. На сайте используется система постановки задач кадетам: можно поставить цель на четверть, в неё включить задачи на месяц, в них включить задачи на неделю, а их, в свою очередь, поделить на ежедневные задачи. Но также можно создавать несвязанные задачи на один день, устанавливая конкретную дату',
      model: apiAssistantModel,
    });
  }

  return assistant;
}

export async function getThread(UserId: number) {
  const thread = await Threads.findOne({
    where: { UserId: UserId, isDeleted: false },
  });

  if (!thread) {
    const threadCreated = await openai.beta.threads.create();

    await Threads.create({
      UserId,
      threadId: threadCreated.id,
      isDeleted: false,
    });
    return threadCreated.id;
  } else {
    return thread.threadId;
  }
}

export async function assistantRun({
  thread,
  res,
  assistant,
  hash,
  UserId,
}: {
  thread: string,
  res: Response,
  assistant: OpenAI.Beta.Assistants.Assistant,
  hash: string;
  UserId: number;
}) {
  let fullReponse: string[] = [];

  const run = openai.beta.threads.runs
    .stream(thread, {
      assistant_id: assistant.id,
    })
    .on('textDelta', (textDelta) => {
      res.write(`data: ${JSON.stringify(textDelta)}\n\n`);
      textDelta.value && fullReponse.push(textDelta.value);
    });

  // Дожидаемся завершения потока
  await run.finalRun();

  // Создаем новую запись или обновляем существующую
  const [record, created] = await OpenAiHash.findOrCreate({
    where: { hash },
    defaults: {hash, UserId, response: JSON.stringify(fullReponse) }
  });
  if (!created) {
    await record.update({ response: JSON.stringify(fullReponse), updatedAt: new Date() });
  }
  // await OpenAiHash.upsert({ UserId, hash, response: JSON.stringify(fullReponse) });

  // Завершаем отправку
  res.write(`data: ${JSON.stringify({value: 'DONE'})}\n\n`);
}

function createHash(requestData: string): string {
  return crypto.createHash('sha256').update(requestData).digest('hex');
}

export async function checkIfHashExists({message}:
  {message: string}
){
  const hash = createHash(message);
  const cachedResponse = await OpenAiHash.findOne({where: {hash, updatedAt: {
    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000), // Кэш, созданный за последние 24 часа
  },}});

  if(cachedResponse){
    return {cachedResponse, hash};
  }else{
    return {hash};
  }
}

export async function useAssistant({req, res, assistantType, message}:{
  req: Request & { jwt: JwtPayload },
  res: Response,
  assistantType?: keyof typeof ASSISTANTS | string,
  message: OpenAI.Beta.Threads.Messages.MessageCreateParams | OpenAI.Beta.Threads.Messages.MessageCreateParams[];
}) {
    const {cachedResponse, hash} = await checkIfHashExists({message: JSON.stringify(message)});

    // Устанавливаем заголовки для SSE
    setAssistantHeaders(res);

    if(cachedResponse){
      const response = JSON.parse(cachedResponse.response).map(async(message: string) => {
        res.write(`data: ${JSON.stringify({value: message})}\n\n`); 
      });

      const hoursUntilReset = 24 - ((Date.now() - cachedResponse.updatedAt.getTime()) / (1000 * 60 * 60));
      const hoursUntilResetString = Math.max(hoursUntilReset, 0).toFixed(0).toString();
      res.write(`data: ${JSON.stringify({value: '\n\n --- \n\n *[Кэшированный ответ]*'})}\n\n`);
      res.write(`data: ${JSON.stringify({value: `\n\n *Сброс кэша через ${hoursUntilResetString} часа(ов)*`})}\n\n`);

      res.write(`data: ${JSON.stringify({value: 'DONE'})}\n\n`);
      return;
    }

    const assistant = await getAssistant(assistantType);
    const thread = await getThread(req.jwt.id);

    


    // Отправляем первое сообщение пользователю
    if(Array.isArray(message)){
      for(let i = 0; i < message.length; i++){
        await openai.beta.threads.messages.create(thread, message[i]);
      }
    }else{
      await openai.beta.threads.messages.create(thread, message);
    }
    

    // Стартуем поток с ответами от ассистента
    await assistantRun({ thread, res, assistant, hash, UserId: req.jwt.id });
}

// Функция для удаления старого кэша
export async function deleteOldCache() {
  try {
    await OpenAiHash.destroy({
      where: {
        updatedAt: {
          [Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000), // Удаляем кэш старше 24 часов
        },
      },
    });
    console.log('Старый кэш успешно удален.');
  } catch (err: any) {
    console.error('Ошибка при удалении старого кэша:', err.message);
  }
}
