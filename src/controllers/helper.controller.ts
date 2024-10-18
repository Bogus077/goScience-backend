import { Request, Response } from 'express';
import OpenAI from 'openai';
import { OPENAI_API_KEY_Proxy, openAiKey } from '../config/config';
import { JwtPayload } from '../middlewares/authJwt';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import fs from 'fs';
import { Kid, Marks, TasksDay, Threads } from '../models';
import { getTasksHelpRules, validateData } from '../utils/validationRules';
import {
  apiAssistantModel,
  assistantRun,
  ASSISTANTS,
  getAssistant,
  getThread,
  setAssistantHeaders,
  useAssistant,
} from '../utils/helper/helper';

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

export async function getAiHelpTasksRequest(
  req: Request & { jwt: JwtPayload },
  res: Response
) {
  try {
    const { KidId  } = req.query as { KidId: string };
    const KidIdParsed = parseInt(KidId);

    validateData({KidId: KidId}, getTasksHelpRules);

    const kid = await Kid.findOne({ where: { id: KidIdParsed } });
    const kidName = `${kid?.surname ?? 'Имя ребенка'} ${
      kid?.name ?? 'не определено'
    }`;

    const marksUndone = await TasksDay.findAll({
      where: { KidId: KidIdParsed, status: false, isDeleted: null },
      limit: 20,
    });
    const marksDone = await TasksDay.findAll({
      where: { KidId: KidIdParsed, status: true, isDeleted: null },
      limit: 20,
    });

    const marksDoneMinimized = marksDone.map((task: typeof TasksDay) => ({
      label: task.label,
      date: task.date,
    }));
    const marksUndoneMinimized = marksUndone.map((task: typeof TasksDay) => ({
      label: task.label,
      date: task.date,
    }));

    const message: OpenAI.Beta.Threads.Messages.MessageCreateParams = {
      role: 'user',
      content: `Вот задачи на день, которые кадет выполнил: ${JSON.stringify(marksDoneMinimized)}. Вот задачи на день, которые кадет ещё не выполнил или пропустил - это зависит от даты: ${JSON.stringify(marksUndoneMinimized)}. Кадета зовут: ${kidName}. Не перечисляй задачи, дай конкретные советы и анализ.`,
    };

    await useAssistant({ req, res, message, assistantType: ASSISTANTS.tasks});
    res.status(200).end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send(JSON.stringify({ error: error }));
    }
  }
}

export async function getAiHelpMarksRequest(
  req: Request & { jwt: JwtPayload },
  res: Response
) {
  try {
    const marks = await Marks.findOne({
      where: { UserId: req.jwt.id, isDeleted: false },
    });

      if(marks){
        const message: OpenAI.Beta.Threads.Messages.MessageCreateParams = { role: 'user', content: marks.marks };
        await useAssistant({ req, res, message, assistantType: ASSISTANTS.marks});
      }
      res.status(200).end();

    // const aapl10k = await openai.files.create({
    //   file: fs.createReadStream(marks.path),
    //   purpose: "assistants",
    // });

    //   const message: OpenAI.Beta.Threads.Messages.MessageCreateParams = { role: 'user', content: 'Оценки детей в файле, прикрепленном выше, который называется marks.txt. Проанализируй их, пожалуйста. Можешь использовать предыдущие файлы с оценками в истории сообщений для сравнения успехов.', attachments: [{ file_id: aapl10k.id, tools: [{ type: "file_search" }] }], };
    //   await useAssistant({ req, res, message, assistantType: ASSISTANTS.marks});
    // res.status(200).end();
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send(JSON.stringify({ error: error }));
    }
  }
}
