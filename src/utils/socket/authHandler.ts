import { NextFunction } from "express";
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { Socket } from "socket.io";
import { Role, UserRole } from "../../models";
import { jwtSecret } from "../../config/config";

export const verifyJwtSocket = async (socket: any, next: any) => {
  const { token, refreshToken } = socket.handshake.auth;

  if (!token) {
    next(new Error(`Token required!`));
  };

  const secret = jwtSecret as Secret | GetPublicKeyOrSecret;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      next(new Error(err.message ?? `Invalid token!`));
      return;
    }
    socket.jwt = decoded;
    next();
  });
}

export const verifyOfficerRole = async (socket: any, next: any) => {
  const { id: UserId } = socket.jwt;

  if (!UserId) {
    next(new Error(`UserId is undefined`));
    console.log('========================')
    console.log('========================')
    console.log('UserId is undefined');
    console.log('========================')
    console.log('========================')
    return;
  };

  const roles = await UserRole.findAll({ where: { UserId } });
  const officerRole = await Role.findOne({ where: { name: 'officer' } });
  if (!officerRole) {
    next(new Error(`OfficerRole is not found`));
    console.log('========================')
    console.log('========================')
    console.log('OfficerRole is not found');
    console.log('========================')
    console.log('========================')
    return;
  };

  const result = roles.find((role: typeof UserRole) => role.RoleId === officerRole.id);
  if (!result) {
    next(new Error(`Officer permissions required`));
    console.log('========================')
    console.log('========================')
    console.log('Officer permissions required');
    console.log(UserId);
    console.log('========================')
    console.log('========================')
    return;
  };  

  next();
}