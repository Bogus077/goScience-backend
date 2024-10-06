import { Request, Response } from 'express'
import OpenAI from "openai";
import { OPENAI_API_KEY_Proxy, openAiKey } from '../config/config';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';

const openai = new OpenAI({
  // organization: "org-fFeCsfdDRZwqxSrCeOrsdpZw",
  // project: "proj_I3XIjQQG7ezXYSVfOf2lQR2z",
  apiKey: OPENAI_API_KEY_Proxy,
  baseURL: "https://api.proxyapi.ru/openai/v1/",
  // httpAgent: HttpsProxyAgent('http://yxhPUBNsXZgd98Rb:GfcM2Kn5WatDerSH@proxy1.accessai.ru:1080'),
});

export async function getAiHelpRequest(req: Request, res: Response) {
  console.log('==============================================')
  console.log('==============================================')
  console.log('==============================================')
  console.log('==============================================')
  console.log('==============================================')

  try{
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "Ты говоришь на русском языке и являешься ассистентом на сайте для преподавателей, которые работают с детьми-кадетами" },
    //     { role: "user", content: "Привет! С чего мне начать?" }
    //   ],
    //   model: "gpt-4o-mini",      
    // });

    const result = '123'
  
    // res.status(200).send(completion.choices[0]);
    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}