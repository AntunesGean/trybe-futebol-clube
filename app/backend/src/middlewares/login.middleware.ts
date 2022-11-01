import { Request, Response, NextFunction } from 'express';
import schemaLogin from '../helpers/schemas/login.schema';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = schemaLogin.validate(body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default { validateLogin };
