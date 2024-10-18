import { Request, Response, NextFunction } from 'express'
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { User, UserRefresh } from '../models';
import { createRefreshToken, createToken } from '../utils/token';
import { jwtSecret } from '../config/config';

export type JwtPayload = { id: number, iat: number, exp: number };

export const setCookie = (res: Response, token: string) => {
  res.cookie('accessToken', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
}

export const verifyJWT = (req: Request & {jwt: JwtPayload}, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;
  const tokenCookie = req.cookies?.accessToken;
  let bearerToken: string | null = null;

  if (!bearerHeader && !tokenCookie) {
    res.status(403).send({ message: `Token required!` }); 
    return;
  };

  if(bearerHeader){
    const bearer = bearerHeader.split(' ');
     bearerToken = bearer[1];
  }else{
    bearerToken = tokenCookie;
  }

  const secret = jwtSecret as Secret | GetPublicKeyOrSecret;

  // TODO:Удалить
  setCookie(res, bearerToken as string);

  jwt.verify(bearerToken as string, secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: `Invalid token!`, error: err });
      return;
    }
    req.jwt = decoded as JwtPayload;
    next();
  });
}

export const verifyJWTRefresh = async (req: Request & {jwt: JwtPayload} & {tokens: {accessToken: string, refreshToken: string}}, res: Response, next: NextFunction) => {
  const refreshHeader = req.headers.authorization;
  if (!refreshHeader) {
    res.status(403).send({ message: `Token required!` }); 
    return;
  };

  const refresh = refreshHeader.split(' ');
  const refreshToken = refresh[1];
  const secret = jwtSecret as Secret | GetPublicKeyOrSecret;

  jwt.verify(refreshToken, secret, async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: `Invalid refresh token!`, error: err });
      return;
    }

    const refresh = await UserRefresh.findOne({where: {refresh: refreshToken, UserId: (decoded as JwtPayload).id}});
    if(!refresh){
      res.status(403).send({ message: `Refresh token not found` }); 
      return;
    }else{
      await refresh.destroy();    
    }

    const user = await User.findOne({where: {id: (decoded as JwtPayload).id}})
    if(!user){
      res.status(403).send({ message: `User not found` }); 
      return;
    }

    const newTokens = {
      accessToken: createToken(user),
      refreshToken: await createRefreshToken(user),
    }

    req.tokens = newTokens;
    next();
  });
}
