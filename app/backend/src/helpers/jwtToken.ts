import { sign, JwtPayload, Secret, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtSecret: Secret = JWT_SECRET as Secret;

const createToken = (user: IUser): string => {
  const payload = user;
  const token = sign({ payload }, jwtSecret, jwtConfig as SignOptions);
  return token;
};

const verifyToken = (token: string): JwtPayload => {
  const decoded = verify(token, jwtSecret);
  return decoded as JwtPayload;
};

export { createToken, verifyToken };
