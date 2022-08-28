import { Request, Response, NextFunction } from 'express'
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { Role, User, UserRefresh, UserRole } from '../models';
import { createRefreshToken, createToken } from '../utils/token';
import { jwtSecret } from '../config/config';

export type JwtPayload = { id: number, iat: number, exp: number };

export const isAdmin = async (req: Request & {jwt: JwtPayload}, res: Response, next: NextFunction) => {
  const { id: UserId } = req.jwt;

  const roles = await UserRole.findAll({ where: { UserId } });
  const adminRole = await Role.findOne({ where: { name: 'admin' } });
  if (!adminRole) {
    res.status(403).send({ message: `AdminRole not found` }); 
    return;
  };

  const result = roles.find((role: typeof UserRole) => role.RoleId === adminRole.id);
  if (!result) {
    res.status(403).send({ message: `Admin permissions required` }); 
    return;
  };  

  next();
}

export const isOfficer = async (req: Request & {jwt: JwtPayload}, res: Response, next: NextFunction) => {
  const { id: UserId } = req.jwt;

  const roles = await UserRole.findAll({ where: { UserId } });
  const officerRole = await Role.findOne({ where: { name: 'officer' } });
  if (!officerRole) {
    res.status(403).send({ message: `OfficerRole not found` }); 
    return;
  };

  const result = roles.find((role: typeof UserRole) => role.RoleId === officerRole.id);
  if (!result) {
    res.status(403).send({ message: `Officer permissions required` }); 
    return;
  };  

  next();
}