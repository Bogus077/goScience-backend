import { Request, Response } from 'express'
import { JwtPayload } from '../middlewares/authJwt';

export async function useRefreshRequest(req: Request & {jwt: JwtPayload} & {tokens: {accessToken: string, refreshToken: string}}, res: Response) {
  try{
    const result = req.tokens;

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}