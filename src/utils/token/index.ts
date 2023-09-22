import jwt, { Secret } from 'jsonwebtoken';
import { jwtSecret, jwtExpiryTime, refreshExpiryTime } from '../../config/config';
import { User, UserRefresh } from '../../models';

/** Create new JWT token */
export const createToken = (user: User) => {
  const token = jwt.sign({ id: user.id }, jwtSecret as Secret,
    {
      expiresIn: jwtExpiryTime
    });
  return token;
}

export const createRefreshToken = async (user: User) => {
  const token = jwt.sign({ id: user.id, type: 'refresh-token' }, jwtSecret as Secret, {
    expiresIn: refreshExpiryTime,
  });

  await UserRefresh.create({ UserId: user.id, refresh: token, used: false });
  return token;
}
