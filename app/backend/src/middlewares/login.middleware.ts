import { Request, Response, NextFunction } from 'express';
import schemaLogin from '../helpers/schemas/login.schema';
import { verifyToken } from '../helpers/jwtToken';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = schemaLogin.validate(body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verifyToken(authorization);
    req.headers.userId = decoded.payload.id;

    next();
  } catch (error: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { validateLogin, validateToken };
