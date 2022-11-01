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
}

export default Controller;
