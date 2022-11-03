import { Request, Response } from 'express';
import Service from '../services/matches.service';

class Controller {
  constructor(private matchService: Service) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(req: Request, res: Response) {
    try {
      const matches = await this.matchService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default Controller;
