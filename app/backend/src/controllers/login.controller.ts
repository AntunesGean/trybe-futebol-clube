import { Request, Response } from 'express';
import Service from '../services/login.service';

class Controller {
  constructor(private service: Service) {}

  async findLogin(req: Request, res: Response) {
    try {
      const token = await this.service.findLogin(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  }

  async getRole(req: Request, res: Response) {
    try {
      const { userId } = req.headers;
      const role = await this.service.getRole(userId as string);
      return res.status(200).json({ role });
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  }
}

export default Controller;
