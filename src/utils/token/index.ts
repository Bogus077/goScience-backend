import jwt, { Secret } from 'jsonwebtoken';
import { jwtSecret, jwtExpiryTime } from '../../config/config';
import { User } from 'src/models';

/** Create new JWT token */
export const createToken = (user: typeof User) => {
  const token = jwt.sign({ id: user.id }, jwtSecret as Secret, {
    expiresIn: jwtExpiryTime,
  });
  return token;
}