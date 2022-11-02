import { Request, Response } from 'express';
import Service from '../services/login.service';

class Controller {
  constructor(private service: Service) {}

  async findLogin(req: Request, res: Response) {
    try {
      const token = await this.service.findLogin(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async getRole(req: Request, res: Response) {
    try {
      const { userId } = req.headers;
      const role = await this.service.getRole(userId as string);
      return res.status(200).json({ role });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default Controller;
