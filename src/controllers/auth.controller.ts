import { Request, Response } from 'express';
import { JwtPayload, setCookie } from '../middlewares/authJwt';

export async function useRefreshRequest(
  req: Request & { jwt: JwtPayload } & {
    tokens: { accessToken: string, refreshToken: string },
  },
  res: Response
) {
  try {
    const result = req.tokens;
    setCookie(res, result.accessToken);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
