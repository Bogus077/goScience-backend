import { Request, Response, NextFunction } from 'express'
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

export type JwtPayload = { id: number, iat: number, exp: number };

export const verifyJWT = (req: Request & {jwt: JwtPayload}, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    res.status(403).send({ message: `Token required!` }); 
    return;
  };

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  const secret = jwtSecret as Secret | GetPublicKeyOrSecret;

  jwt.verify(bearerToken, secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: `Invalid token!`, error: err });
      return;
    }
    req.jwt = decoded as JwtPayload;
    next();
  });
}
